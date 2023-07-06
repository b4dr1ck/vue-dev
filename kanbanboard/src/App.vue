<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4" v-for="statusCard in statusCards" :key="statusCard.id">
        <StatusCard
          :statusCard="statusCard"
          :tasks="fiteredTasks(statusCard.status)"
          @new-task="addTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatusCard from "./components/StatusCard.vue";

export default {
  name: "App",
  components: {
    StatusCard,
  },

  data() {
    return {
      tasks: [
        {
          id: 1,
          content: "Dashboard überarbeiten.",
          status: 0,
        },
        {
          id: 2,
          content: "Anwendung auf Vue.js umstellen.",
          status: 0,
        },
      ],
      statusCards: [
        {
          title: "Neue Aufgaben",
          titleClasses: "bg-secondary text-white",
          newTasks: true,
          status: 0,
        },
        {
          title: "In Bearbeitung",
          titleClasses: "bg-primary text-white",
          newTasks: false,
          status: 1,
        },
        {
          title: "Erledigt",
          titleClasses: "bg-success text-white",
          newTasks: false,
          status: 2,
        },
      ],
    };
  },
  methods: {
    fiteredTasks(status) {
      return this.tasks.filter((task) => task.status === status);
    },
    addTask(task) {
      task.id = Math.random();
      this.tasks.push(task);
    }
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
