import indexTemplate from "../templates/todo/index.hbs"
import newTemplate from "../templates/todo/new.hbs"
import newTodoTemplate from "../templates/todo/new_todo.hbs"
import editTemplate from "../templates/todo/edit.hbs"
import todoTemplate from "../templates/todo/todo.hbs"
import errorTemplate from "../templates/error.hbs"
Handlebars.registerPartial('todoPartial', todoTemplate)

let TodoActions = {

  // INDEX
  indexTodoPush(channel){
    channel.push("index", {})
  },

  indexTodoReceive(resp){
    $('[data-todo="todos-container"]')
      .empty()
      .prepend(indexTemplate(resp))
  },

  // NEW
  newTodo(){
    $('[data-todo="new-todo-container"]')
      .empty()
      .append(newTemplate)
  },

  // CREATE
  createTodoPush(channel){
    let name = $('[data-todo="new-todo-name"]').val()
    channel.push("create", {name: name})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        $('[data-todo="new-todo-container"]').append(errorTemplate(error))
      })
  },

  createTodoReceive(resp){
    $('[data-todo="new-todo-container"]').empty()
    $('[data-todo="todo-index-container"]').prepend(newTodoTemplate(resp))
  },

  // EDIT
  editTodo(){
    let parent = $(this).parents('li')
    let name = parent.find('[data-todo="name"]').data('todo-name')
    parent.empty().prepend(editTemplate({name: name}))
  },

  // UPDATE
  updateTodoPush(event){
    let channel = event.data.channel
    let parent = $(this).parents('[data-todo="todo-container"]')
    let name = parent.find('[data-todo="edit-todo-name"]').val()
    let todo_id = parent.data('todo-id')
    channel.push("update", {name: name, todo_id: todo_id})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        parent.append(errorTemplate(error))
      })
  },

  updateTodoStatusPush(event){
    let channel = event.data.channel
    let parent = $(this).parents('[data-todo="todo-container"]')
    let complete = parent.find('[data-todo="name"]').data('todo-complete')
    let todo_id = parent.data('todo-id')
    channel.push("update", {complete: !complete, todo_id: todo_id})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        parent.append(errorTemplate(error))
      })
  },

  updateTodoReceive(resp){
    $(`[data-todo-id="${resp.id}"]`)
      .empty()
      .prepend(todoTemplate(resp))
  },

  updateTodoCancel(){
    let parent = $(this).parents('[data-todo="todo-container"]')
    let name = parent.find('[data-todo="edit-todo-name"]').data('todo-name')
    parent.empty().prepend(todoTemplate({name: name}))
  },

  // DELTE
  deleteTodoPush(event){
    let channel = event.data.channel
    let todo_id = $(this).parents('[data-todo="todo-container"]').data('todo-id')
    channel.push("delete", {todo_id: todo_id})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        parent.append(errorTemplate(error))
      })
  },

  deleteTodoReceive(resp){
    $(`[data-todo-id="${resp.id}"]`)
      .remove()
  }
}

export default TodoActions
