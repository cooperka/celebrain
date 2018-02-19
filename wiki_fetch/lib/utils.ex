defmodule WikiFetch.Utils do

  @doc """
  ## Examples

      iex> WikiFetch.Utils.get_images %{"123" => %{"pageimage" => "/foo"}, "456" => %{}}
      ["/foo", nil]
  """
  def get_images pages do
    pages
    |> Enum.map(fn {_, page} -> page["pageimage"] end)
  end

  @doc """
  ## Examples

      iex> WikiFetch.Utils.get_member_ids [%{"pageid" => 123}, %{"pageid" => 456}]
      "123|456"
  """
  def get_member_ids ids do
    ids
    |> Enum.map(fn member -> member["pageid"] end)
    |> Enum.reduce(fn id, reduction -> "#{reduction}|#{id}" end)
  end

  @doc """
  Fetch and parse a JSON API response.

  ## Examples

      iex> response = WikiFetch.Utils.fetch! "https://api.github.com/users/cooperka"
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
