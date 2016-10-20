defmodule ChanDoThis.ListChannel do
  use Phoenix.Channel
  use ChanDoThis.Web, :channel
  import ChanDoThis.ListActions
  import ChanDoThis.ChannelsErrors,
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

  def handle_in("update", params, socket) do
    case update_list(params) do
      {:ok, list} ->
        broadcast!(socket, "update", list_to_json(list))
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, parse_changeset_errors(changeset)}, socket}
    end
  end

end
