defmodule ChanDoThis.Repo.Migrations.AddTodos do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :name, :string, null: false
      add :complete, :boolean, null: false, default: false
      add :list_id, references(:lists), null: false

      timestamps
    end

    create index(:todos, [:list_id])
  end
end
