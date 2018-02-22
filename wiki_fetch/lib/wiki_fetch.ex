defmodule WikiFetch do
  import WikiFetch.Utils

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
    pageviews = File.read!("data.json")
    |> Poison.decode!
    |> Enum.map(fn member -> member["title"] end)
    |> get_all_pageviews()

    IO.inspect pageviews

    :ok
  end

  @spec get_all_pageviews([]) :: %{}
  def get_all_pageviews(titles) do
    titles
    |> Enum.reduce(%{}, fn (title, reduction) -> Map.put(reduction, title, get_pageviews(title)) end)

    receive_pageviews()
  end

  @spec get_pageviews(String.t) :: %{}
  def get_pageviews(title) do
    title = String.replace(title, " ", "_")
    response = fetch_async! "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/#{title}/monthly/#{@timeframe}"
  end

  def receive_pageviews() do
    {status, chunk} = receive do
      %HTTPoison.AsyncStatus{} -> {:ignore, nil}
      %HTTPoison.AsyncHeaders{} -> {:ignore, nil}
      %HTTPoison.AsyncChunk{chunk: chunk} -> {:ok, chunk}
      %HTTPoison.AsyncEnd{} -> {:ignore, nil}
      after 5_000 -> {:complete, nil}
    end

    if status == :ok do
      response = Poison.decode! chunk
      item = List.first(response["items"])
      IO.puts "#{item["article"]}: #{item["views"]}"
    end

    unless status == :complete do
      receive_pageviews()
    end
  end

  @spec get_wiki_data() :: :ok
  def get_wiki_data do
    members = get_members()
    images = get_images(members)

    data = images
    # Only keep members with valid images.
    |> Enum.filter(fn({_, data}) -> data[:image] != nil end)
    # Merge all relevant data into one map.
    |> Enum.map(fn({key, data}) ->
      Map.merge(data, members[key])
      |> Map.put(:id, key)
    end)

    File.write!("data.json", Poison.encode!(data, pretty: true), [:binary])
  end

  @spec get_members() :: %{}
  def get_members(members \\ %{}, continue_key \\ nil) do
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

    members = members
    |> Map.merge(new_members)

    if @members_cap > 0 && map_size(members) >= @members_cap do
      members
    else
      # Fetch the next page if there is one.
      case response["continue"]["cmcontinue"] do
        nil -> members
        continue_key -> get_members(members, continue_key)
      end
    end
  end

  @spec get_images(%{}) :: %{}
  def get_images(members, images \\ %{}) do
    # Max of 50 images per request.
    {first_50, remaining_members} = Enum.split(members, 50)

    ids = first_50
    # Put the tuples from Enum.split back into a map.
    |> Map.new
    |> get_member_id_string()

    response = fetch_wiki! "action=query&format=json&pageids=#{ids}&prop=pageimages&pithumbsize=#{@thumbsize}"

    # Save data to a map indexed by page ID.
    new_images = response["query"]["pages"]
    |> Enum.reduce(%{}, fn({key, page}, reduction) -> Map.put(reduction, String.to_integer(key), %{
      image: page["thumbnail"]["source"],
      filename: page["pageimage"],
    }) end)

    images = images
    |> Map.merge(new_images)

    case remaining_members do
      [] -> images
      _ -> get_images(remaining_members, images)
    end
  end

end
