import Todo from '../views/todo'
import indexTemplate from "../templates/list/index.hbs"
import newTemplate from "../templates/list/new.hbs"
import newListTemplate from "../templates/list/new_list.hbs"
import editTemplate from "../templates/list/edit.hbs"
import listTemplate from "../templates/list/list.hbs"
import errorTemplate from "../templates/error.hbs"
Handlebars.registerPartial('listPartial', listTemplate)

let ListActions = {

  // INDEX
  indexListPush(channel){
    channel.push("index", {})
  },

  indexListReceive(resp){
    $('[data-list="list-index-container"]')
      .empty()
      .prepend(indexTemplate(resp))
  },

  // NEW
  newList(){
    $('[data-list="new-list-container"]')
      .empty()
      .append(newTemplate)
  },

  // CREATE
  createListPush(channel){
    let name = $('[data-list="new-list-name"]').val()
    channel.push("create", {name: name})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        $('[data-list="new-list-container"]').append(errorTemplate(error))
      })
  },

  createListReceive(resp){
    $('[data-list="new-list-container"]').empty()
    $('[data-list="list-index-container"]').prepend(newListTemplate(resp))
  },

  // SHOW
  showList(event){
    let socket = event.data.socket
    let list_id = $(this).parents('[data-list="list-container"]').data('list-id')
    Todo.init(socket, list_id)
  },

  // EDIT
  editList(){
    let parent = $(this).parents('li')
    let name = parent.find('[data-list="name"]').data('list-name')
    parent.empty().prepend(editTemplate({name: name}))
  },

  // UPDATE
  updateListPush(event){
    let channel = event.data.channel // http://api.jquery.com/on/
    let parent = $(this).parents('[data-list="list-container"]')
    let name = parent.find('[data-list="edit-list-name"]').val()
    let list_id = parent.data('list-id')
    channel.push("update", {name: name, list_id: list_id})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        parent.append(errorTemplate(error))
      })
  },

  updateListReceive(resp){
    $(`[data-list-id="${resp.id}"]`)
      .empty()
      .prepend(listTemplate(resp))
  },

  updateListCancel(){
    let parent = $(this).parents('[data-list="list-container"]')
    let name = parent.find('[data-list="edit-list-name"]').data('list-name')
    parent.empty().prepend(listTemplate({name: name}))
  },

  // DELETE
  deleteListPush(event){
    let channel = event.data.channel // http://api.jquery.com/on/
    let list_id = $(this).parents('[data-list="list-container"]').data('list-id')
    channel.push("delete", {list_id: list_id})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        parent.append(errorTemplate(error))
      })
  },

  deleteListReceive(resp){
    $(`[data-list-id="${resp.id}"]`)
      .remove()
  }
}

export default ListActions
