defmodule ChanDoThis.ListChannelTest do
  use ChanDoThis.ChannelCase, asyinc: true
  alias ChanDoThis.{List, ListFactory, Todo, TodoFactory}

  setup [:join_channel]

  describe "index list" do
    test "broadcasts existing lists", %{socket: socket} do
      list1 = ListFactory.insert(:list, name: "list1")
      list2= ListFactory.insert(:list, name: "list2")
      list1_id = list1.id
      list2_id = list2.id

      ref = push(socket, "index", %{})

      assert_reply ref, :ok, %{}
      assert_broadcast "index", %{lists: [%{id: ^list1_id, name: "list1"}, %{id: ^list2_id, name: "list2"}]}
    end
  end

  describe "create list" do
    test "new list is persisted", %{socket: socket} do
      valid_attrs = %{name: "cool list"}
      before_count = records_count(List)

      ref = push(socket, "create", valid_attrs)

      assert_reply ref, :ok, %{}
      list_id = Repo.get_by(List, name: "cool list").id
      assert_broadcast "create", %{id: ^list_id, name: "cool list"}
      assert records_count(List) == before_count + 1
    end
  end

  describe "update list" do
    test "list update is persisted", %{socket: socket} do
      list = ListFactory.insert(:list, name: "cool list")
      list_id = list.id
      valid_attrs = %{list_id: list_id, name: "very cool list"}

      ref = push(socket, "update", valid_attrs)

      assert_reply ref, :ok, %{}
      assert_broadcast "update", %{id: ^list_id, name: "very cool list"}
    end
  end

  describe "delete list" do
    test "list is deleted", %{socket: socket} do
      list = ListFactory.insert(:list, name: "cool list")
      list_id = list.id
      ListFactory.insert(:list)
      ListFactory.insert(:list)
      before_count = records_count(List)

      ref = push(socket, "delete", %{"list_id" => list_id})

      assert_reply ref, :ok, %{}
      assert_broadcast "delete", %{id: ^list_id, name: "cool list"}
      assert records_count(List) == before_count - 1
      refute Repo.get(List, list_id)
    end

    test "list todos are also deleted", %{socket: socket} do
      list = ListFactory.insert(:list, name: "cool list")
      list_id = list.id
      TodoFactory.insert(:todo, list: list)
      TodoFactory.insert(:todo, list: list)
      list_todos = Todo |> Ecto.Query.where(list_id: ^list_id)

      assert records_count(list_todos) == 2
      ref = push(socket, "delete", %{"list_id" => list_id})

      assert_reply ref, :ok, %{}
      assert records_count(list_todos) == 0
    end
  end

  defp join_channel(_context) do
    {:ok, socket} = connect(ChanDoThis.UserSocket, %{})
    {:ok, _, socket} = subscribe_and_join(socket, "lists")
    {:ok, socket: socket}
  end
end
