import TodoActions from '../helper/todo_actions'

let Todo = {
  init(socket, list_id){
    this.leave_open_todo_channels(socket)
    let channel = socket.channel('todos_for_list_id:' + list_id)
    channel.join()
      .receive('ok', resp => {
        TodoActions.indexTodoPush(channel)
      })
      .receive('error', reason => {
        console.log('Error joining channel: ', reason)
      })

    channel.on('index', resp => {
      TodoActions.indexTodoReceive(resp)
    })

    $(document).on('click', '[data-behaviour="new-todo"]',
      TodoActions.newTodo)

    $(document).on('click', '[data-behaviour="create-todo"]',
      () => TodoActions.createTodoPush(channel))

    $(document).on('click', '[data-behaviour="cancel-create-todo"]',
      () => $('[data-todo="new-todo-container"]').empty())

    channel.on('create', resp => {
      TodoActions.createTodoReceive(resp)
    })


  },

  // if todos channels are open, will listen to the 'index' action
  // from other users that open the same channels
  leave_open_todo_channels(socket){
    for(let channel of socket.channels) {
      if(channel.topic.match(/^todos_for_list_id:/)){
        channel.leave()
      }
    }
  }
}

export default Todo
