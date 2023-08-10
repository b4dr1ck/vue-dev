<template>
  <div class="container-fluid">
    <SearchTodos @search-todo="searchTodo($event)" />
    <AllTodos :searchText="searchText" />
  </div>
</template>

<script>
import AllTodos from "./components/AllTodos.vue";
import SearchTodos from "./components/SearchTodos.vue";

export default {
  name: "App",
  components: {
    AllTodos,
    SearchTodos,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    searchTodo(searchText) {
      this.searchText = searchText;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~bootstrap-icons/font/bootstrap-icons.css";

body {
  background-color: rgb(50, 50, 50);
}
</style>
