defmodule ChanDoThis.TodoView do
  use ChanDoThis.Web, :view

  def render("todo.json", %{todo: todo}) do
    %{
      id: todo.id,
      name: todo.name,
      complete: todo.complete
    }
  end
end
