defmodule WikiFetch.Utils do

  @doc """
  ## Examples

      iex> WikiFetch.Utils.get_member_id_string %{a: %{}, b: %{}}
      "a|b"
  """
  def get_member_id_string members do
    members
    |> Map.keys()
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
