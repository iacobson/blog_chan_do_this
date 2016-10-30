import ListActions from '../helper/list_actions'

let List = {
  init(socket){
    socket.connect()
    let channel = socket.channel('lists')
    channel.join()
      .receive('ok', resp => {
        ListActions.indexListPush(channel)
      })
      .receive('error', reason => {
        console.log('Error joining channel: ', reason)
      })

    channel.on('index', resp => {
      ListActions.indexListReceive(resp)
    })

    $('[data-behaviour="new-list"]').on('click', ListActions.newList)

    $(document).on('click', '[data-behaviour="create-list"]',
      () => ListActions.createListPush(channel))

    $(document).on('click', '[data-behaviour="cancel-create-list"]',
      () => $('[data-list="new-list-container"]').empty())

    channel.on('create', resp => {
      ListActions.createListReceive(resp)
    })

    $(document).on('click', '[data-behaviour="edit-list"]',
      ListActions.editList)

    // TODO: any better way to pass both the click scope
      // and also pass the channel, such as:
      // () => ListActions.updateListPush(channel, list_id)
      // channel and the list_id are in DIFFERENT SCOPES
    $(document).on('click', '[data-behaviour="update-list"]',
       {channel: channel}, ListActions.updateListPush)

    channel.on('update', resp => {
      ListActions.updateListReceive(resp)
    })

    $(document).on('click', '[data-behaviour="cancel-update-list"]',
      ListActions.updateListCancel)

    $(document).on('click', '[data-behaviour="delete-list"]',
       {channel: channel}, ListActions.deleteListPush)

    channel.on('delete', resp => {
      ListActions.deleteListReceive(resp)
    })

    $(document).on('click', '[data-behaviour="open-todos"]',
      {socket: socket}, ListActions.showList)
  }
}

export default List
