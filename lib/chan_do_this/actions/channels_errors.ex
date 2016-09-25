defmodule ChanDoThis.Actions.ChannelsErrors do
  import ChanDoThis.ErrorHelpers, only: [translate_error: 1]
  import Phoenix.Naming, only: [humanize: 1]

  def parse_changeset_errors(changeset) do
    changeset.errors
    |> List.first
    |> first_changeset_error()
  end

  defp first_changeset_error({attr, message}) do
    %{
      attr: humanize(attr),
      message: translate_error(message)
    }
  end

  defp first_changeset_error(_) do
    %{
      attr: "Error",
      message: "unknown"
    }
  end
end
