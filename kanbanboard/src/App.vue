<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4" v-for="i in 3" :key="i">
        <StatusCard />
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
    };
  },
  computed: {
    newTasks() {
      return this.tasks.filter((task) => task.status === 0);
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
