defmodule ChanDoThis.List do
  use ChanDoThis.Web, :model

  schema "lists" do
    field :name, :string

    has_many :todos, ChanDoThis.ToDo

    timestamps
  end


  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end

end
