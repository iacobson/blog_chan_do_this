defmodule ChanDoThis.ListActions do
  import Ecto.Query, only: [order_by: 3]
  alias ChanDoThis.{Repo, List, ListView}

  def get_all_lists do
    List
    |> order_by([list], desc: list.inserted_at)
    |> Repo.all()
  end

  def create_list(params) do
    List.changeset(%List{}, params)
    |> Repo.insert()
  end

  def update_list(params) do
    Repo.get(List, params["list_id"])
    |> List.changeset(params)
    |> Repo.update()
  end

  def delete_list(params) do
    Repo.get(List, params["list_id"])
    |> Repo.delete()
  end

  def list_to_json(list) do
    Phoenix.View.render_one(list, ListView, "list.json")
  end

  def lists_to_json(lists) do
    Phoenix.View.render_many(lists, ListView, "list.json")
  end

end
