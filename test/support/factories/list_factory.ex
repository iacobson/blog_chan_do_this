defmodule ChanDoThis.ListFactory do
  use ExMachina.Ecto, repo: ChanDoThis.Repo
  alias ChanDoThis.{List}

  def list_factory do
    %List{
      name: sequence(:name, &"List #{&1}")
    }
  end
end
