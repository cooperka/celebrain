defmodule WikiFetch do

  @moduledoc """
  Documentation for WikiFetch.
  """

  @category "American_male_film_actors"
  @limit 5
  @thumbsize 800

  def get_photos do
    ids = get_members()
    |> Enum.map(fn member -> member["pageid"] end)
    |> Enum.reduce(fn id, reduction -> "#{reduction}|#{id}" end)

    response = fetch! "https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=#{ids}&prop=pageimages&pithumbsize=#{@thumbsize}"
    response["query"]["pages"]
    |> Enum.map(fn {_, page} -> page["pageimage"] end)
  end

  def get_members do
    response = fetch! "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category%3A#{@category}&cmlimit=#{@limit}"
    response["query"]["categorymembers"]
  end

  @doc """
  Fetch and parse a JSON API response.

  ## Examples

      iex> response = WikiFetch.fetch! "https://api.github.com/users/cooperka"
      iex> response["login"]
      "cooperka"

  """
  def fetch! url do
    {:ok, response} = fetch url
    response
  end

  def fetch url do
    IO.puts "GET #{url}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, decode body}
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, "Error: 404"}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end

  defp decode body do
    body
    |> Poison.decode!
  end

end
