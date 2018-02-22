defmodule WikiFetch do
  import WikiFetch.Utils
  alias WikiFetch.MapAgent

  @moduledoc """
  Documentation for WikiFetch.
  """

  # American_male_film_actors
  # American_film_actresses
  @category "American_male_film_actors" # Wikipedia category to pull from.
  @page_size 500 # Fetch this many at a time from Wikipedia (max is 500).
  @members_cap 100 # Halt once we get this many (in case there are thousands of members).
  @thumbsize 800 # Max dimension size (either width or height) for images.
  @timeframe "2018010100/2018020100" # Start/end dates for pageview counts. 1st of a month to 1st of the next month.

  @doc """
  Add pageview data to the existing data.json file.
  """
  @spec add_wiki_pageviews() :: :ok
  def add_wiki_pageviews do
    File.read!("data.json")
    |> Poison.decode!
    |> get_all_pageviews()

    data_by_title = receive do
      :complete -> MapAgent.get_all()
    end

    data_by_title
    |> Map.values()
    |> write_data()
  end

  @spec get_all_pageviews([]) :: :ok
  defp get_all_pageviews(data) do
    data
    |> Enum.each(fn (member) -> get_pageviews(snake_case(member["title"])) end)

    data_by_title = data
    |> Enum.reduce(%{}, fn (member, reduction) -> Map.put(reduction, snake_case(member["title"]), member) end)

    :ok = MapAgent.start_link(data_by_title)

    receive_chunks(fn (response) ->
      item = List.first(response["items"])
      MapAgent.merge_values(item["article"], %{pageviews: item["views"]})
    end)
  end

  defp get_pageviews(title) do
    fetch_async! "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/#{title}/monthly/#{@timeframe}"
  end

  @spec get_wiki_data() :: :ok
  def get_wiki_data do
    members_by_id = get_members_by_id()
    images_by_id = get_images_by_id(members_by_id)

    images_by_id
    # Only keep members with valid images.
    |> Enum.filter(fn({_, data}) -> data[:image] != nil end)
    # Merge all relevant data into one map.
    |> Enum.map(fn({key, data}) ->
      Map.merge(data, members_by_id[key])
      |> Map.put(:id, key)
    end)
    |> write_data()
  end

  @spec get_members_by_id() :: %{}
  defp get_members_by_id(members_by_id \\ %{}, continue_key \\ nil) do
    extra_params = case continue_key do
      nil -> ""
      _ -> "&cmcontinue=#{continue_key}"
    end
    response = fetch_wiki! "action=query&format=json&list=categorymembers&cmtitle=Category%3A#{@category}&cmlimit=#{@page_size}#{extra_params}"

    # Save data to a map indexed by page ID.
    new_members = response["query"]["categorymembers"]
    # Only include ns 0 (Wikipedia Articles).
    |> Enum.filter(fn(member) -> member["ns"] == 0 end)
    # Ignore certain types of names like "Abbott and Costello".
    |> Enum.filter(fn(member) -> !(member["title"] =~ ~r/ and /) end)
    |> Enum.reduce(%{}, fn(member, reduction) -> Map.put(reduction, member["pageid"], %{
      title: member["title"],
    }) end)

    members_by_id = members_by_id
    |> Map.merge(new_members)

    if @members_cap > 0 && map_size(members_by_id) >= @members_cap do
      members_by_id
    else
      # Fetch the next page if there is one.
      case response["continue"]["cmcontinue"] do
        nil -> members_by_id
        continue_key -> get_members_by_id(members_by_id, continue_key)
      end
    end
  end

  @spec get_images_by_id(%{}) :: %{}
  defp get_images_by_id(members_by_id, images_by_id \\ %{}) do
    # Max of 50 images per request.
    {first_50, remaining_members} = Enum.split(members_by_id, 50)

    ids = first_50
    # Put the tuples from Enum.split back into a Map.
    |> Map.new
    |> get_member_id_string()

    response = fetch_wiki! "action=query&format=json&pageids=#{ids}&prop=pageimages&pithumbsize=#{@thumbsize}"

    # Save data to a map indexed by page ID.
    new_images = response["query"]["pages"]
    |> Enum.reduce(%{}, fn({key, page}, reduction) -> Map.put(reduction, String.to_integer(key), %{
      image: page["thumbnail"]["source"],
      filename: page["pageimage"],
    }) end)

    images_by_id = images_by_id
    |> Map.merge(new_images)

    case remaining_members do
      [] -> images_by_id
      _ -> get_images_by_id(remaining_members, images_by_id)
    end
  end

end
