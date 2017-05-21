<template>
  <div class="lists-index">
    <ul class="list-group lists-index">
      <li class="list-group-item" v-for="list in lists" :key="list.id">
        <button type="button" class="btn btn-warning btn-xs">
          EDIT
        </button>
        <button type="button" class="btn btn-danger btn-xs">
          DELETE
        </button>
        <span >
          <b>  {{list.name}}  </b>
        </span>
        <button type="button" class="btn btn-info btn-xs pull-right">
          OPEN
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      lists() {
        return this.$store.state.lists
      }
    }

  }

</script>
