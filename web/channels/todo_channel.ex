defmodule ChanDoThis.TodoChannel do
  use Phoenix.Channel
  use ChanDoThis.Web, :channel
  import ChanDoThis.TodoActions
  import ChanDoThis.ListActions, only: [list_to_json: 1, list_by_id: 1]
  import ChanDoThis.ChannelsErrors,
    only: [parse_changeset_errors: 1]


  def join("todos_for_list_id:" <> list_id, _params, socket) do
    {:ok, assign(socket, :list_id, list_id)}
  end

  def handle_in("index", _params, socket) do
    list_id = socket.assigns.list_id
    list = list_by_id(list_id)
    todos = todos_for_list_id(list_id)
    broadcast!(socket, "index", %{list: list_to_json(list), todos: todos_to_json(todos)})
    {:reply, :ok, socket}
  end

  def handle_in(topic = "create", params, socket) do
    list = list_by_id(socket.assigns.list_id)
    handle_action(topic, create_todo(list, params), socket)
  end

  def handle_in(topic = "update", params, socket) do
    list = list_by_id(socket.assigns.list_id)
    handle_action(topic, update_todo(list, params), socket)
  end

  def handle_in(topic = "delete", params, socket) do
    list = list_by_id(socket.assigns.list_id)
    handle_action(topic, delete_todo(list, params), socket)
  end
  
  defp handle_action(topic, action, socket) do
    case action do
      {:ok, todo} ->
        broadcast!(socket, topic, todo_to_json(todo))
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, parse_changeset_errors(changeset)}, socket}
    end
  end
end
