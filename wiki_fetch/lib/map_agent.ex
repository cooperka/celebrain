defmodule WikiFetch.MapAgent do
  use Agent

  def start_link(_opts) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put(key, value) do
    Agent.update(__MODULE__, fn(map) -> Map.put(map, key, value) end)
    IO.puts "Added [#{key}: #{value}]"
  end

  def get(key) do
    Agent.get(__MODULE__, fn(map) -> Map.get(map, key) end)
  end

  def get_all() do
    Agent.get(__MODULE__, fn(map) -> map end)
  end
end
