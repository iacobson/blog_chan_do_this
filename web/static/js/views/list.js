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

    $(document).on('click', '[data-behaviour="cancel-update-list"]',
      ListActions.updateListCancel)

  }
}

export default List
