<script>
import Task from "./components/Task.vue";
import { tasks } from "./seed.js";

export default {
  name: "App",
  emits: ["update-title", "update-text", "update-color", "update-lock","delete-task"],
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
    deleteTask(payload) {
      const id = payload.id;
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
        title: "",
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
    <!--New Task-->
    <div
      id="newTask"
      @click="createNewTask($event)"
      style="min-height: 200px;min-width: 300px;"
      class=" d-flex cursor-pointer ma-1">
      <v-icon class="create-task-icon pa-1" icon="mdi-plus-circle-outline"></v-icon>
      <p class="create-task-text ma-auto">Create New Task</p>
    </div>
    <task
      class="ma-1 flex-grow-1"
      @delete-task="deleteTask($event)"
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
  </div>
</template>

<style>
#newTask {
  color: #aaa;
  border-color: #aaa;
}

#newTask:hover {
  color: white;
  border-color: white;
}
</style>
