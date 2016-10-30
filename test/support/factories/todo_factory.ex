defmodule ChanDoThis.TodoFactory do
  use ExMachina.Ecto, repo: ChanDoThis.Repo
  alias ChanDoThis.{ListFactory, Todo}

  def todo_factory do
    %Todo{
      name: sequence(:name, &"List #{&1}"),
      complete: false,
      list: ListFactory.build(:list)
    }
  end
end
