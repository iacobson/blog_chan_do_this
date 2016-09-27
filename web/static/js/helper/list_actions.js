import index_template from "../templates/list/index.hbs"
import new_template from "../templates/list/new.hbs"
import list_template from "../templates/list/list.hbs"
import error_template from "../templates/error.hbs"
Handlebars.registerPartial('listPartial', list_template)

let ListActions = {
  index_list_push(channel){
    channel.push("index", {})
  },

  index_list_receive(resp){
    $('[data-list="list-index-container"]')
      .empty()
      .prepend(index_template(resp))
  },

  new_list(){
    $('[data-list="new-list-container"]')
      .empty()
      .append(new_template)
  },

  create_list_push(channel){
    let name = $('[data-list="new-list-name"]').val()
    channel.push("create", {name: name})
      .receive("error", error => {
        $(`[data-error="error-${error.attr}"]`).remove()
        $('[data-list="new-list-container"]').append(error_template(error))
      })
  },

  create_list_receive(resp){
    $('[data-list="new-list-container"]').empty()
    $('[data-list="list-index-container"]').prepend(list_template(resp))
  }
}

export default ListActions
