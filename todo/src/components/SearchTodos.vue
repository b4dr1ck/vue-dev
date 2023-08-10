<template>
  <div style="width: 19rem" class="row my-2">
    <i class="fs-4 bi bi-search col col-2 text-white text-center"></i>
    <input @input="searchTodo" v-model="searchText" type="text" placeholder="Suche..." class="form-control col" />
  </div>
</template>

<script>
export default {
  name: "SearchTodos",
  emits: ["search-todo"],
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    searchTodo() {
      this.$emit("search-todo", this.searchText);
    },
  },
};
</script>

<style></style>
