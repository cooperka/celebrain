defmodule WikiFetch.MapAgent do
  use Agent

  def start_link(initial \\ %{}) do
    case Agent.start_link(fn -> initial end, name: __MODULE__) do
      {:ok, _} -> :ok
      {:error, {:already_started, _}} -> reset(initial)
    end
  end

  def reset(state) do
    Agent.update(__MODULE__, fn (_) -> state end)
  end

  def put(key, value) do
    IO.puts "Adding [#{key}: #{value}]"
    Agent.update(__MODULE__, fn(map) -> Map.put(map, key, value) end)
  end

  def merge_values(key, values) do
    IO.puts "Adding to #{key}: " <> inspect values
    Agent.update(__MODULE__, fn(map) ->
      Map.update!(map, key, fn (curr_value) -> Map.merge(curr_value, values) end)
    end)
  end

  def get(key) do
    Agent.get(__MODULE__, fn(map) -> Map.get(map, key) end)
  end

  def get_all() do
    Agent.get(__MODULE__, fn(map) -> map end)
  end
end
