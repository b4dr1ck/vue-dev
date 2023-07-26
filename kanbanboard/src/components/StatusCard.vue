<template>
  <div class="card" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <div class="card-header text-center" :class="statusCard.titleClasses">
      <h4>{{ statusCard.title }}</h4>
      <small>{{ tasksAmount }} Task(s)</small>
    </div>
    <div class="card-body">
      <TaskEntry
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :alertColor="alertColor"
        draggable="true"
        @dragstart="startDrag($event, task)"
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
    },
    "status-updated": (statusDO) => {
      if ("newStatus" in statusDO === false) {
        console.warn("StatusCard: Jede Aufgabe muss ein Status-Attribut haben");
        return false;
      }
      return true;
    },
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
    },
    tasksAmount() {
      console.log(this.tasks)
      return this.tasks.filter(task => task.status === this.statusCard.status).length;
    }
  },
  methods: {
    newTask(task) {
      task.status = this.statusCard.status;
      this.$emit("new-task", task);
    },
    startDrag(event, task) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("taskId", task.id);
    },
    onDrop(event) {
      const taskId = event.dataTransfer.getData("taskId");
      this.$emit("status-updated", {
        taskId: Number(taskId),
        newStatus:  this.statusCard.status,
      });
    },
  },
};
</script>

<style scoped></style>
