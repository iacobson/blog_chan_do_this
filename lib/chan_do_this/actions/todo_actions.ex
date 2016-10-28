defmodule ChanDoThis.TodoActions do
  import Ecto.Query, only: [where: 3, order_by: 3]
  alias ChanDoThis.{Repo, Todo, TodoView}

  def todos_for_list_id(list_id) do
    Todo
    |> where([todo], todo.list_id == ^list_id)
    |> order_by([todo], asc: todo.complete, desc: todo.inserted_at)
    |> Repo.all
  end

  def todos_to_json(todos) do
    Phoenix.View.render_many(todos, TodoView, "todo.json")
  end


end
