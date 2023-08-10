<template>
  <div class="row justify-content-end me-1">
    <i title="Done" @click="doneTodo" role="button" class="bi bi-check2-all col col-lg-1"></i>
    <i title="Edit" @click="editTodo" role="button" class="bi bi-pencil-square col col-lg-1"></i>
    <i title="Delete" @click="deleteTodo" role="button" class="bi bi-trash col col-lg-1"></i>
  </div>
</template>

<script>
export default {
  name: "TodoOptions",
  emits: ["edit-todo", "delete-todo","done-todo"],
  methods: {
    editTodo() {
      this.$emit("edit-todo");
    },
    deleteTodo() {
      this.$emit("delete-todo");
    },
    doneTodo() {
      this.$emit("done-todo");
    },
  },
};
</script>

<style scoped>
i:hover {
  color: black;
}
</style>
