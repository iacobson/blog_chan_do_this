<template>
  <div class="lists-index">
    <ul class="list-group lists-index">
      <li class="list-group-item" v-for="list in lists" :key="list.id">
        <lists-list v-bind:list="list"></lists-list>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListsList from "./lists_list"
  export default {
    components: {
      "lists-list": ListsList
    },

    computed: {
      lists() {
        return this.$store.state.lists
      }
    }

  }

</script>
