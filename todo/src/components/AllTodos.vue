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
      :ctime="todo.ctime"
      :key="todo.id"
      v-for="todo in todos"
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
  data() {
    return {
      todos: todos,
    };
  },
  methods: {
    newTodo() {
      this.todos.unshift({
        id: this.todos.length,
        header: "",
        text: "",
        deadline: "",
        color: 0,
        edit: true,
        ctime: "",
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

      let counter = 0;
      this.todos.map((todo) => {
        todo.id = counter;
        counter++;
      });
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
