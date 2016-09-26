defmodule ChanDoThis.ListChannelTest do
  use ChanDoThis.ChannelCase, asyinc: true
  alias ChanDoThis.{List}

  setup [:join_channel]

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

  defp join_channel(_context) do
    {:ok, socket} = connect(ChanDoThis.UserSocket, %{})
    {:ok, _, socket} = subscribe_and_join(socket, "lists")
    {:ok, socket: socket}
  end
end
