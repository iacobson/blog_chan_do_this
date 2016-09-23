defmodule ChanDoThis.ListChannel do
  use Phoenix.Channel
  use ChanDoThis.Web, :channel

  def join("lists", _, socket), do: {:ok, socket}
end
