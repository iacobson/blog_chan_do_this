defmodule ChanDoThis.Repo.Migrations.AddLists do
  use Ecto.Migration

  def change do
    create table(:lists) do
      add :name, :string, null: false

      timestamps
    end

    create unique_index(:lists, [:name])
  end
end
