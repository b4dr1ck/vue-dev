<template>
  <div class="row">
    <NewTodo @click="newTodo" />
    <TodoEntry
      @dragstart="startDrag($event, todo)"
      @edit-todo="editTodo($event)"
      @delete-todo="deleteTodo($event)"
      @cancel-edit="cancelEdit($event)"
      @commit-edit="commitEdit($event)"
      @change-color="changeColor($event)"
      @done-todo="doneTodo($event)"
      @on-drop-id="onDrop($event)"
      :id="todo.id"
      :header="todo.header"
      :text="todo.text"
      :deadline="todo.deadline"
      :color="todo.color"
      :edit="todo.edit"
      :done="todo.done"
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
  mounted() {
    const storage = localStorage.getItem("todos");
    if (storage) {
      this.todos = JSON.parse(storage);
    }
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
    onDrop(payload) {
      const array_move = (arr, init, target) => {
        [arr[init], arr[target]] = [arr[target], arr[init]];
      };

      const dragTodo = this.todos.findIndex((todo) => todo.id === payload.drag);
      const dropTodo = this.todos.findIndex((todo) => todo.id === payload.drop);

      array_move(this.todos, dragTodo, dropTodo);

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    startDrag(event, todo) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("todoId", todo.id);
    },
    doneTodo(id) {
      const todoId = id;
      const todoObj = this.todos.find((todo) => todo.id === todoId);
      todoObj.done = !todoObj.done;
    },
    newTodo() {
      this.todos.unshift({
        id: Date.now(),
        header: "",
        text: "",
        deadline: "",
        color: 0,
        edit: true,
      });

      localStorage.setItem("todos", JSON.stringify(this.todos));
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

      localStorage.setItem("todos", JSON.stringify(this.todos));
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

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    changeColor(colorData) {
      const todoObj = this.todos.find((todo) => todo.id === colorData.id);
      todoObj.color = colorData.newColor;
    },
  },
};
</script>

<style></style>
