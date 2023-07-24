<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="Neue Aufgabe"
      v-model="content"
      v-focus="{color: 'green'}"
    />
    <small> Noch {{ numberOfCharsLeft }} Zeichen erlaubt </small>
    <div class="d-grid my-2">
      <!-- verwende dynamische Directives mittels []: click && dbclick-->
      <button @[mode]="submitTask()" class="btn btn-secondary">Eintragen</button>
    </div>
    <!-- teleportiere diesen Teil in ein anderes div names #settings-->
    <teleport to="#settings">
      <select v-model="mode" class="form-select">
        <option value="click">Einfacher Klick</option>
        <option value="dblclick">Doppelklick</option>
      </select>
  </teleport>
  </div>
</template>

<script>
export default {
  name: "NewTask",
  inject: ["maxNumberOfChars"],
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
  data() {
    return {
      content: "",
      mode: "click",
    };
  },
  computed: {
    numberOfCharsLeft() {
      return this.maxNumberOfChars - this.content.length;
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
