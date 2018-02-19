defmodule WikiFetch do
  import WikiFetch.Utils

  @moduledoc """
  Documentation for WikiFetch.
  """

  @category "American_male_film_actors"
  @limit 5
  @thumbsize 800

  def get_photos do
    ids = get_members()
    |> get_member_ids()

    response = fetch! "https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=#{ids}&prop=pageimages&pithumbsize=#{@thumbsize}"
    response["query"]["pages"]
    |> get_images()
  end

  def get_members do
    response = fetch! "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category%3A#{@category}&cmlimit=#{@limit}"
    response["query"]["categorymembers"]
  end

end
