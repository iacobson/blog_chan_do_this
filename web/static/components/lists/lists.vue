<template>
  <div class="lists">
    <div class="panel panel-primary">
      <div class="panel-heading clearfix">
        <h2 class="panel-title">
          LISTS
          <button type="button" class="btn btn-success btn-sm pull-right" v-on:click="showNewList">
            ADD
          </button>
        </h2>
      </div>

      <div class="panel-body new-list" v-if="showNewListForm">
        <div class="form-horizontal">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="list name" v-model="newListName">
          </div>
          <div class="form-group">
            <div class="btn-group btn-group-justified" role="group">
              <div class="btn-group" role="group">
                <button type="submit" class="btn btn-success btn-xs" v-on:click="createList">
                  CREATE
                </button>
              </div>
              <div class="btn-group" role="group">
                <button class="btn btn-danger btn-xs" v-on:click="hideNewList">
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>

      <lists-index></lists-index>
    </div>

  </div>
</template>

<script>
  import ListsIndex from "./lists_index"

  export default {
    components: {
      "lists-index": ListsIndex,
    },

    data() {
      return {
        showNewListForm: false,
        newListName: "",
      }
    },

    methods: {
      showNewList() {
        this.showNewListForm = true
      },
      hideNewList() {
        this.showNewListForm = false
        this.newListName = ""
      },
      createList() {
        this.$store.state.listChannel.push("create", {name: this.newListName})
        this.hideNewList()
      }
    }
  }
</script>
