defmodule WikiFetch do

  @moduledoc """
  Documentation for WikiFetch.
  """

  @expected_fields ~w(
    login public_repos public_gists followers following
  )

  def get_username do
    response = fetch! "https://api.github.com/users/cooperka"
    response[:login]
  end

  @doc """
  Fetch and parse a JSON API response.

  ## Examples

      iex> response = WikiFetch.fetch! "https://api.github.com/users/cooperka"
      iex> response[:login]
      "cooperka"

  """
  def fetch! url do
    {:ok, response} = fetch url
    response
  end

  def fetch url do
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
    |> Map.take(@expected_fields)
    |> Enum.map(fn({k, v}) -> {String.to_atom(k), v} end)
  end

end
