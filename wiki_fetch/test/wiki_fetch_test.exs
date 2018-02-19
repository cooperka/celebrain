defmodule WikiFetchTest do
  use ExUnit.Case
  doctest WikiFetch

  test "greets the world" do
    assert WikiFetch.hello() == :world
  end
end
