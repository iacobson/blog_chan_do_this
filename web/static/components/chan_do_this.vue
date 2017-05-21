<template>
  <div class="chan-do-this">
    <div class="container-fluid">
      <div class="row">

        <div class="col-md-1"></div>

        <div class="col-md-4">
          <lists></lists>
        </div>

        <div class="col-md-1"></div>

        <div class="col-md-5 todos">
        </div>

        <div class="col-md-1"></div>
      </div>
    </div>
  </div>


</template>


<script>
  import Lists from "./lists/lists"
  import socket from "../js/socket"


  export default {
    created() {
      this.connectSocket()
    },

    components: {
      "lists": Lists
    },

    methods: {
      connectSocket() {
        socket.connect

        this.$store.commit("addSocket", socket)
      }
    }
  }

</script>


<style lang="sass">
  .chan-do-this {

  }
</style>
