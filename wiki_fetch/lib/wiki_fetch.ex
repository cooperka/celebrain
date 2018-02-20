defmodule WikiFetch do
  import WikiFetch.Utils

  @moduledoc """
  Documentation for WikiFetch.
  """

  @category "Physics"
  @limit 50
  @thumbsize 800

  @spec get_wiki_data() :: [%{}]
  def get_wiki_data do
    members = get_members()
    images = get_images(members)

    images
    # Only keep members with valid images.
    |> Enum.filter(fn({_, data}) -> data[:image] != nil end)
    # Merge all relevant data into one map.
    |> Enum.map(fn({key, data}) ->
      Map.merge(data, members[key])
      |> Map.put(:id, key)
    end)
  end

  @spec get_members() :: %{}
  def get_members(members \\ %{}, cmcontinue \\ nil) do
    extra_params = case cmcontinue do
      nil -> ""
      _ -> "&cmcontinue=#{cmcontinue}"
    end
    response = fetch_wiki! "action=query&format=json&list=categorymembers&cmtitle=Category%3A#{@category}&cmlimit=#{@limit}#{extra_params}"

    # Save data to a map indexed by page ID.
    new_members = response["query"]["categorymembers"]
    |> Enum.filter(fn(member) -> member["ns"] == 0 end)
    |> Enum.reduce(%{}, fn(member, reduction) -> Map.put(reduction, member["pageid"], %{name: member["title"]}) end)

    members = members
    |> Map.merge(new_members)

    case response["continue"]["cmcontinue"] do
      nil -> members
      cmcontinue -> get_members(members, cmcontinue)
    end
  end

  @spec get_images(%{}) :: %{}
  def get_images(members, images \\ %{}) do
    # Max of 50 images per request.
    {first_50, remaining} = Enum.split(members, 50)

    ids = first_50
    # Put the tuples from Enum.split back into a map.
    |> Map.new
    |> get_member_id_string()

    response = fetch_wiki! "action=query&format=json&pageids=#{ids}&prop=pageimages&pithumbsize=#{@thumbsize}"

    # Save data to a map indexed by page ID.
    new_images = response["query"]["pages"]
    |> Enum.reduce(%{}, fn({key, page}, reduction) -> Map.put(reduction, String.to_integer(key), %{image: page["pageimage"]}) end)

    images = images
    |> Map.merge(new_images)

    case remaining do
      [] -> images
      _ -> get_images(remaining, images)
    end
  end

end
