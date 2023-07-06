<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="Neue Aufgabe"
      v-model="content"
    />
    <div class="d-grid my-2">
      <button @click="submitTask()" class="btn btn-secondary">Eintragen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewTask",
  data() {
    return {
      content: "",
    };
  },
  // - kurze Schreibweise
  // emits:["new-task"],
  // - lange Schreibweise
  emits: {
    "new-task": (task) => {
      // Validiere das Custom Event (new-task)
      if (!task.content) {
        console.warn("NewTask: Content darf nicht leer sein!");
        return false;
      }
      return true;
    },
  },
  methods: {
    submitTask() {
      this.$emit("new-task", {
        content: this.content,
      });
      this.content = "";
    },
  },
};
</script>

<style scoped></style>
