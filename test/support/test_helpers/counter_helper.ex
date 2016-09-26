defmodule ChanDoThis.TestHelpers.CounterHelper do
  import Ecto.Query, only: [select: 3]

  def records_count(queryable) do
    queryable
    |> select([s], count(s.id))
    |> ChanDoThis.Repo.one
  end
end
