import ListActions from "../helper/list_actions"

let List = {
  init(socket){
    socket.connect()
    let channel = socket.channel("lists")
    channel.join()
      .receive("ok", resp => {
        ListActions.index_lists(channel)
      })
      .receive("error", reason => {
        console.log("Error joining channel: ", reason)
      })

    $('[data-behaviour="new-list"]').on('click', ListActions.new_list)

    $(document).on('click', '[data-behaviour="create-list"]',
      () => ListActions.create_list_push(channel))

    $(document).on('click', '[data-behaviour="cancel-create-list"]',
      () => $('[data-list="new-list-container"]').empty())

    channel.on("create", resp => {
      ListActions.create_list_receive(resp)
    })


  }
}

export default List
