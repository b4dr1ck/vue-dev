<template>
  <div class="card">
    <div class="card-header text-center" :class="statusCard.titleClasses">
      <h4>{{ statusCard.title }}</h4>
    </div>
    <div class="card-body">
      <TaskEntry
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :alertColor="alertColor"
      />
    </div>
    <div v-if="statusCard.newTasks" class="card-footer">
      <NewTask @new-task="newTask" />
    </div>
  </div>
</template>

<script>
import TaskEntry from "./TaskEntry.vue";
import NewTask from "./NewTask.vue";

export default {
  name: "StatusCard",
  components: {
    TaskEntry,
    NewTask,
  },
  emits: {
    "new-task": (task) => {
      if ("status" in task === false) {
        console.warn("StatusCard: Jede Aufgabe muss ein Status-Attribut haben");
        return false;
      }
      return true;
    }
  },
  props: ["statusCard", "tasks"],
  computed: {
    alertColor() {
      switch (this.statusCard.status) {
        case 0:
          return "secondary";
        case 1:
          return "primary";
        case 2:
          return "success";
      }
      return "danger";
    }
  },
  methods: {
    newTask(task) {
      task.status = this.statusCard.status;
      this.$emit("new-task", task);
    }
  }
};
</script>

<style scoped></style>
