defmodule ChanDoThis.Actions.ListOperations do
  alias ChanDoThis.{Repo, List, ListView}

  def get_all_lists do
    Repo.all(List)
  end

  def create_list(params) do
    List.changeset(%List{}, params)
    |> Repo.insert()
  end

  def list_to_json(list) do
    Phoenix.View.render(ListView, "list.json", %{list: list})
  end

  def lists_to_json(lists) do
    Phoenix.View.render_many(lists, ListView, "list.json")
  end

end
