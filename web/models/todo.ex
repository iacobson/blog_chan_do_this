defmodule ChanDoThis.Todo do
  use ChanDoThis.Web, :model

  schema "todos" do
    field :name, :string
    field :complete, :boolean

    belongs_to :list, ChanDoThis.List

    timestamps
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :complete, :list_id])
    |> validate_required([:name, :list_id])
  end

end
