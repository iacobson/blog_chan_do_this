import indexTemplate from "../templates/todo/index.hbs"
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
}

export default TodoActions
