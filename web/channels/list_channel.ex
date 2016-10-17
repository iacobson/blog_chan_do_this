defmodule ChanDoThis.ListChannel do
  use Phoenix.Channel
  use ChanDoThis.Web, :channel
  import ChanDoThis.Actions.ListActions,
    only: [create_list: 1, list_to_json: 1,
          get_all_lists: 0, lists_to_json: 1]
  import ChanDoThis.Actions.ChannelsErrors,
    only: [parse_changeset_errors: 1]

  def join("lists", _, socket), do: {:ok, socket}

  def handle_in("index", _params, socket) do
    broadcast!(socket, "index", %{lists: lists_to_json(get_all_lists)})
    {:reply, :ok, socket}
  end

  def handle_in("create", params, socket) do
    case create_list(params) do
      {:ok, list} ->
        broadcast!(socket, "create", list_to_json(list))
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, parse_changeset_errors(changeset)}, socket}
    end
  end

end
