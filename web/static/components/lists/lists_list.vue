<template>
  <div class="lists-list">
    <div class="show-list" v-if="showEditListForm === false">
      <button type="button" class="btn btn-warning btn-xs" v-on:click="showEditList">
        EDIT
      </button>
      <button type="button" class="btn btn-danger btn-xs">
        DELETE
      </button>
      <span >
        <b>  {{this.list.name}}  </b>
      </span>
      <button type="button" class="btn btn-info btn-xs pull-right">
        OPEN
      </button>
    </div>

    <div class="edit-list-form" v-if="showEditListForm">
      <div class="form-horizontal">
        <div class="form-group">
          <input type="text" class="form-control" v-model="editListName">
        </div>
        <div class="form-group">
          <div class="btn-group btn-group-justified" role="group">
            <div class="btn-group" role="group">
              <button type="submit" class="btn btn-success btn-xs">
                UPDATE
              </button>
            </div>
            <div class="btn-group" role="group">
              <button class="btn btn-danger btn-xs" v-on:click="hideEditList">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: ["list"],

  data() {
    return {
      showEditListForm: false,
      editListName: this.list.name,
    }
  },

  methods: {
    showEditList() {
      this.showEditListForm = true
    },
    hideEditList() {
      this.showEditListForm = false
      this.editListName = this.list.name
    }
  }

}
</script>
