<script>
import Task from "./components/task.vue";
import { tasks } from "./seed.js";

export default {
  name: "App",
  emits: ["update-title", "update-text", "update-color", "update-lock"],
  data() {
    return {
      tasks: tasks,
    };
  },
  components: {
    Task,
  },
  mounted() {
    this.loadFromLocalStorage();
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    loadFromLocalStorage() {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    },

    updateTitle(payload) {
      const value = payload.title;
      const id = payload.id;
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.title = value;
      }
      this.saveToLocalStorage();
    },
    updateText(payload) {
      const value = payload.text;
      const id = payload.id;
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.text = value;
      }
      this.saveToLocalStorage();
    },
    updateColor(payload) {
      const value = payload.color;
      const id = payload.id;
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.color = value;
      }
      this.saveToLocalStorage();
    },
    updateLock(payload) {
      const id = payload.id;
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.lock = !task.lock;
      }
      this.saveToLocalStorage();
    },
    deleteTask(id) {
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    createNewTask() {
      console.log("new");
      const newTask = {
        id: Date.now(),
        title: "New Task",
        text: "",
        color: "grey-darken-4",
      };
      this.tasks.push(newTask);
      this.saveToLocalStorage();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-wrap">
    <task
      class="ma-1 flex-grow-1"
      @click.right.prevent="deleteTask(task.id)"
      @update-title="updateTitle($event)"
      @update-text="updateText($event)"
      @update-color="updateColor($event)"
      @update-lock="updateLock($event)"
      style="max-width: 400px; min-height: 200px"
      :id="task.id"
      :title="task.title"
      :text="task.text"
      :color="task.color"
      :lock="task.lock"
      v-for="task in tasks"></task>

    <!--New Task-->
    <div
      @click="createNewTask($event)"
      style="width: 400px; min-height: 200px"
      class="border-dashed d-flex cursor-pointer">
      <p class="ma-auto"><v-icon icon="mdi-plus"></v-icon>New Task</p>
    </div>
  </div>
</template>

<style></style>
