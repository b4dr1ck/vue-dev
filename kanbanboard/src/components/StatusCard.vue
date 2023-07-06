<template>
  <div class="card">
    <div class="card-header text-center bg-secondary text-white">
      <h4>Neue Aufgaben</h4>
    </div>
    <div class="card-body">
        <TaskEntry />
    </div>
    <div class="card-footer">
        <NewTask />
    </div>
  </div>
</template>

<script>
import TaskEntry from './TaskEntry.vue';
import NewTask from './NewTask.vue';

export default {
  name: "StatusCard",
  components: {
    TaskEntry,
    NewTask,
  }
};
</script>

<style scoped></style>
