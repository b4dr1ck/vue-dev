<script>
import Task from "./components/Task.vue";
import { tasks } from "./seed.js";

export default {
  name: "App",
  emits: ["update-title", "update-text", "update-color", "update-lock", "delete-task", "update-deadline"],
  data() {
    return {
      tasks: tasks,
      draggedTask: null, // To store the task being dragged
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
    updateDeadline(payload) {
      const value = payload.deadline;
      const id = payload.id;
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.deadline = value.toString();
      }
      this.saveToLocalStorage();
    },
    createNewTask() {
      console.log("new");
      const newTask = {
        id: Date.now(),
        title: "",
        text: "",
        color: "grey-darken-4",
        deadline: "",
      };
      this.tasks.push(newTask);
      this.saveToLocalStorage();
    },
    onDragStart(task) {
      if (task.lock) return; // Prevent dragging if the task is locked
      this.draggedTask = task; // Store the dragged task
    },
    onDragOver(event) {
      event.preventDefault(); // Allow dropping
    },
    onDrop(targetTask) {
      // Swap the dragged task with the target task
      const draggedIndex = this.tasks.findIndex((t) => t.id === this.draggedTask.id);
      const targetIndex = this.tasks.findIndex((t) => t.id === targetTask.id);

      // Swap the tasks in the array
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const temp = this.tasks[draggedIndex];
        this.tasks[draggedIndex] = this.tasks[targetIndex];
        this.tasks[targetIndex] = temp;
      }

      // Save the updated task order
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
      style="height: 100%; width: 100%"
      class="d-flex cursor-pointer ma-1 border-dashed pa-1">
      <div class="d-flex ma-auto">
        <v-icon class="pa-1" style="font-size: 64px" icon="mdi-plus-circle-outline"></v-icon>
      </div>
    </div>
    <task
      class="ma-1 flex-grow-1"
      @delete-task="deleteTask($event)"
      @update-title="updateTitle($event)"
      @update-text="updateText($event)"
      @update-color="updateColor($event)"
      @update-lock="updateLock($event)"
      @update-deadline="updateDeadline($event)"
      style="max-width: 400px; min-height: 200px"
      :id="task.id"
      :title="task.title"
      :text="task.text"
      :color="task.color"
      :lock="task.lock"
      :deadline="task.deadline"
      v-for="task in tasks"
      :key="task.id"
      draggable="true" 
      @dragstart="onDragStart(task)"
      @dragover="onDragOver($event)"
      @drop="onDrop(task)" 
    ></task>
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

/* Optional: Add some visual feedback for dragging */
[draggable="true"] {
  cursor: grab;
}

[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.7;
}
</style>
