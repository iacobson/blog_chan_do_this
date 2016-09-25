import new_template from "../templates/list/new.hbs"
import list_template from "../templates/list/list.hbs"
import error_template from "../templates/error.hbs"

let ListActions = {
  index_lists(channel){
    console.log("here will display the index!")
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
