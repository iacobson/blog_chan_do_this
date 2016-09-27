import indexTemplate from "../templates/list/index.hbs"
import newTemplate from "../templates/list/new.hbs"
import listTemplate from "../templates/list/list.hbs"
import errorTemplate from "../templates/error.hbs"
Handlebars.registerPartial('listPartial', listTemplate)

let ListActions = {
  indexListPush(channel){
    channel.push("index", {})
  },

  indexListReceive(resp){
    $('[data-list="list-index-container"]')
      .empty()
      .prepend(indexTemplate(resp))
  },

  newList(){
    $('[data-list="new-list-container"]')
      .empty()
      .append(newTemplate)
  },

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
    $('[data-list="list-index-container"]').prepend(listTemplate(resp))
  }
}

export default ListActions
