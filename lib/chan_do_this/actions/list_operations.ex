defmodule ChanDoThis.Actions.ListOperations do
  alias ChanDoThis.{Repo, List, ListView}

  def create_list(params) do
    List.changeset(%List{}, params)
    |> Repo.insert()
  end

  def list_to_json(list) do
    Phoenix.View.render(ListView, "list.json", %{list: list})
  end

end
