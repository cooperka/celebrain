defmodule WikiFetch.Utils do

  @doc """
  ## Examples

      iex> WikiFetch.Utils.get_member_id_string %{a: %{}, b: %{}}
      "a|b"
  """
  @spec get_member_id_string(%{}) :: String.t
  def get_member_id_string(members_by_id) do
    members_by_id
    |> Map.keys()
    |> Enum.reduce(fn id, reduction -> "#{reduction}|#{id}" end)
  end

  def fetch_wiki! params do
    response = fetch! "https://en.wikipedia.org/w/api.php?#{params}"

    warnings = response["warnings"]
    if warnings != nil do
      IO.puts IO.ANSI.light_yellow() <> inspect warnings
    end

    response
  end

  @doc """
  Fetch and parse a JSON API response.

  ## Examples

      iex> response = WikiFetch.Utils.fetch! "https://api.github.com/users/cooperka"
      iex> response["login"]
      "cooperka"
  """
  def fetch!(url) do
    {:ok, response} = fetch(url, false)
    response
  end

  def fetch_async!(url) do
    {:ok, response} = fetch(url, true)
    response
  end

  def fetch(url, async?) do
    IO.puts "GET #{url}"

    stream_to = if async? do
      self()
    else
      nil
    end

    case HTTPoison.get(url, %{}, stream_to: stream_to) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, decode body}
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, "Error: 404"}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
      {:ok, _} ->
        {:ok, "async"}
    end
  end

  defp decode body do
    body
    |> Poison.decode!
  end

end
