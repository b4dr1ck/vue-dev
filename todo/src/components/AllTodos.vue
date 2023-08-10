<template>
  <div class="row">
    <NewTodo @click="newTodo" />
    <TodoEntry
      @edit-todo="editTodo($event)"
      @delete-todo="deleteTodo($event)"
      @cancel-edit="cancelEdit($event)"
      @commit-edit="commitEdit($event)"
      @change-color="changeColor($event)"
      :id="todo.id"
      :header="todo.header"
      :text="todo.text"
      :deadline="todo.deadline"
      :color="todo.color"
      :edit="todo.edit"
      :key="todo.id"
      v-for="todo in filteredTodos"
    />
  </div>
</template>

<script>
import { todos } from "@/seed.js";

import NewTodo from "./NewTodo.vue";
import TodoEntry from "./TodoEntry.vue";

export default {
  name: "AllTodos",
  components: {
    NewTodo,
    TodoEntry,
  },
  props: {
    searchText: String,
  },
  data() {
    return {
      todos: todos,
    };
  },
  computed: {
    filteredTodos() {
      if (this.searchText === "") {
        return this.todos;
      }

      return this.todos.filter((todo) => {
        return todo.header.indexOf(this.searchText) >= 0 || todo.text.indexOf(this.searchText) >= 0;
      });
    },
  },
  methods: {
    newTodo() {
      this.todos.unshift({
        id: Date.now(),
        header: "",
        text: "",
        deadline: "",
        color: 0,
        edit: true,
      });
    },
    editTodo(id) {
      const todoId = id;
      const todoObj = this.todos.find((todo) => todo.id === todoId);
      todoObj.edit = true;
    },
    deleteTodo(id) {
      const todoId = id;
      const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos.splice(todoIndex, 1);
    },
    cancelEdit(id) {
      const todoId = id;
      const todoObj = this.todos.find((todo) => todo.id === todoId);
      todoObj.edit = false;
    },
    commitEdit(commitData) {
      const todoObj = this.todos.find((todo) => todo.id === commitData.id);
      todoObj.header = commitData.header;
      todoObj.text = commitData.text;
      todoObj.deadline = commitData.deadline;
      todoObj.edit = false;
    },
    changeColor(colorData) {
      const todoObj = this.todos.find((todo) => todo.id === colorData.id);
      todoObj.color = colorData.newColor;
    },
  },
};
</script>

<style></style>
