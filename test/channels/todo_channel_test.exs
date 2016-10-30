defmodule ChanDoThis.TodoChannelTest do
  use ChanDoThis.ChannelCase, asyinc: true
  alias ChanDoThis.{Todo, TodoFactory, ListFactory}

  setup [:join_channel]

  describe "index todos for list" do
    test "boadcasts todos for current list", %{socket: socket, list: list} do
      todo1 = TodoFactory.insert(:todo, list: list, name: "todo1")
      TodoFactory.insert(:todo)
      {list_id, todo1_id} = {list.id, todo1.id}

      ref = push(socket, "index", %{})

      assert_reply ref, :ok, %{}
      assert_broadcast "index", %{list: %{id: ^list_id, name: _}, todos: [%{id: ^todo1_id, name: "todo1", complete: false}]}
    end
  end

  describe "create todo" do
    test "new todo is persisted", %{socket: socket, list: list} do
      valid_attrs = %{name: "new todo"}
      before_count = records_count(Todo)

      ref = push(socket, "create", valid_attrs)

      assert_reply ref, :ok, %{}
      todo = Repo.get_by(Todo, name: "new todo", list_id: list.id)
      todo_id = todo.id
      assert_broadcast "create", %{id: ^todo_id, name: "new todo", complete: _}
      assert records_count(Todo) == before_count + 1
    end
  end

  describe "update todo" do
    test "todo name update is persisted", %{socket: socket, list: list} do
      todo = TodoFactory.insert(:todo, list: list)
      todo_id = todo.id
      valid_attrs = %{todo_id: todo_id, name: "updated todo"}

      ref = push(socket, "update", valid_attrs)

      assert_reply ref, :ok, %{}
      assert_broadcast "update", %{id: ^todo_id, name: "updated todo", complete: _}
    end

    test "todo changes complete status", %{socket: socket, list: list} do
      todo = TodoFactory.insert(:todo, list: list, complete: false)
      todo_id = todo.id
      valid_attrs = %{todo_id: todo_id, complete: true}

      ref = push(socket, "update", valid_attrs)

      assert_reply ref, :ok, %{}
      assert_broadcast "update", %{id: ^todo_id, name: _, complete: true}
    end
  end

  describe "delete todo" do
    test "todo is deleted", %{socket: socket, list: list} do
      todo = TodoFactory.insert(:todo, list: list)
      todo_id = todo.id
      TodoFactory.insert(:todo)
      TodoFactory.insert(:todo)
      before_count = records_count(Todo)

      ref = push(socket, "delete", %{"todo_id" => todo_id})

      assert_reply ref, :ok, %{}
      assert_broadcast "delete", %{id: ^todo_id, name: _, complete: _}
      assert records_count(Todo) == before_count - 1
      refute Repo.get(Todo, todo_id)
    end
  end

  defp join_channel(_context) do
    list = ListFactory.insert(:list)
    channel_name = "todos_for_list_id:" <> to_string(list.id)
    {:ok, socket} = connect(ChanDoThis.UserSocket, %{})
    {:ok, _, socket} = subscribe_and_join(socket, channel_name)
    {:ok, socket: socket, list: list}
  end
end
