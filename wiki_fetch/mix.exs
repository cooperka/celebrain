defmodule WikiFetch.MixProject do
  use Mix.Project

  def project do
    [
      app: :wiki_fetch,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      dialyzer: [flags: [:unmatched_returns, :error_handling, :race_conditions, :underspecs]],
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:httpoison, "~> 1.0"},
      {:poison, "~> 3.1"},
      {:dialyxir, "~> 0.5", only: [:dev], runtime: false},
    ]
  end
end
