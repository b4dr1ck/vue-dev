<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4" v-for="statusCard in statusCards" :key="statusCard.id">
        <StatusCard
          :statusCard="statusCard"
          :tasks="fiteredTasks(statusCard.status)"
          @new-task="addTask"
          @status-updated="updateStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatusCard from "./components/StatusCard.vue";
//import logger from "./mixins/logger";

export default {
  name: "App",
 // mixins: [logger],
  components: {
    StatusCard,
  },

  provide() {
    return {
      maxNumberOfChars: 255,
    };
  },

  data() {
    return {
      tasks: [
        {
          id: 1,
          content: "Dashboard überarbeiten.",
          status: 1,
        },
        {
          id: 2,
          content: "Anwendung auf Vue.js umstellen.",
          status: 2,
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
  // mounted() {
  //   console.log("App-Component ist bereit!");
  // },
  methods: {
    fiteredTasks(status) {
      return this.tasks.filter((task) => task.status === status);
    },
    addTask(task) {
      task.id = Math.random();
      this.tasks.push(task);
      // kommt aus den mixins
      this.writeLogEntry("Neue Aufgabe hinzugefügt");
    },
    updateStatus(statusDO) {
      console.log(statusDO)
      const task = this.tasks.find((task) => task.id === statusDO.taskId);
      task.status = statusDO.newStatus;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
