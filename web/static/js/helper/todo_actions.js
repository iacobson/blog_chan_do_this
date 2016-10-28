import indexTemplate from "../templates/todo/index.hbs"
import newTemplate from "../templates/todo/new.hbs"
import newTodoTemplate from "../templates/todo/new_todo.hbs"
import todoTemplate from "../templates/todo/todo.hbs"
import errorTemplate from "../templates/error.hbs"
Handlebars.registerPartial('todoPartial', todoTemplate)

let TodoActions = {

  // INDEX
  indexTodoPush(channel){
    channel.push("index", {})
  },

  indexTodoReceive(resp){
    $('[data-todo="todo-container"]')
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
}

export default TodoActions
