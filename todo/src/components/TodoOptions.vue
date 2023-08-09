<template>
  <div class="row justify-content-end me-1">
    <!--i role="button" class="bi bi-paint-bucket col col-lg-1"></i-->
    <i @click="editTodo" role="button" class="bi bi-pencil-square col col-lg-1"></i>
    <i @click="deleteTodo" role="button" class="bi bi-trash col col-lg-1"></i>
  </div>
</template>

<script>
export default {
  name: "TodoOptions",
  emits: ["edit-todo", "delete-todo"],
  methods: {
    editTodo() {
      this.$emit("edit-todo");
    },
    deleteTodo() {
      this.$emit("delete-todo");
    },
  },
};
</script>

<style scoped>
i:hover {
  color: black;
}
</style>
