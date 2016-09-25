defmodule ChanDoThis.ListView do
  use ChanDoThis.Web, :view

  def render("list.json", %{list: list}) do
    %{
      id: list.id,
      name: list.name
    }
  end
end
