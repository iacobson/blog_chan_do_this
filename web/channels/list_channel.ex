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

  def handle_in(topic = "create", params, socket) do
    handle_action(topic, create_list(params), socket)
  end

  def handle_in(topic = "update", params, socket) do
    handle_action(topic, update_list(params), socket)
  end

  def handle_in(topic = "delete", params, socket) do
    handle_action(topic, delete_list(params), socket)
  end

  defp handle_action(topic, action, socket) do
    case action do
      {:ok, list} ->
        broadcast!(socket, topic, list_to_json(list))
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, parse_changeset_errors(changeset)}, socket}
    end
  end
end
