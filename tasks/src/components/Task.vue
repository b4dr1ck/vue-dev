<script>
import Color from "./Color.vue";

export default {
  name: "Task",
  components: {
    Color,
  },
  props: {
    id: Number,
    title: String,
    text: String,
    color: String,
    lock: Boolean,
    deadline: String,
  },
  data() {
    return {
      availableColors: [
        "grey-darken-4",
        "red-darken-4",
        "green-darken-4",
        "blue-darken-4",
        "pink-darken-4",
        "yellow-darken-4",
        "brown-darken-4",
        "blue-grey-darken-4",
      ],
    };
  },
  computed: {
    lockActive() {
      return this.lock ? "#ccc" : "rgba(0,0,0,0.7)";
    },
    isOverdue() {
      if (!this.deadline) return false;
      const deadlineDate = new Date(this.deadline);
      const today = new Date();
      return deadlineDate < today;
    },
  },
  methods: {
    updateTitle(value) {
      this.$emit("update-title", { title: value, id: this.id });
    },
    updateText(value) {
      this.$emit("update-text", { text: value, id: this.id });
    },
    updateColor(value) {
      this.$emit("update-color", { color: value, id: this.id });
    },
    updateLock() {
      this.$emit("update-lock", { id: this.id });
    },
    deleteTask() {
      if (this.lock) {
        return;
      }
      this.$emit("delete-task", { id: this.id });
    },
    updateDeadline(value) {
      this.$emit("update-deadline", { deadline: value, id: this.id });
    },
  },
};
</script>

<template>
  <div :class="`bg-${color} pa-2`">
    <div class="d-flex mb-2">
      <color
        @click="updateColor(availableColor)"
        v-for="availableColor in availableColors"
        :availableColor="availableColor"
        :activeColor="color"></color>
    </div>
    <v-text-field
      :readonly="lock"
      :bg-color="color"
      @update:modelValue="updateTitle($event)"
      label="Task Titel"
      density="compact"
      :model-value="title"
      variant="solo-filled"></v-text-field>
    <v-textarea
      :readonly="lock"
      :bg-color="color"
      auto-grow
      @update:modelValue="updateText($event)"
      label="Task Beschreibung"
      density="compact"
      :model-value="text"
      variant="solo-filled">
    </v-textarea>
    <v-text-field
      :prepend-icon="isOverdue ? 'mdi-alert text-red' : 'mdi-calendar'"
      :readonly="lock"
      :bg-color="color"
      placeholder="YYYY-MM-DD HH:MM"
      @update:modelValue="updateDeadline($event)"
      label="Task Deadline"
      density="compact"
      :model-value="deadline"
      variant="solo-filled"></v-text-field>

    <v-icon title="Task sperren" @click="updateLock(id)" :style="`color:${lockActive};`" icon="mdi-lock"></v-icon>
    <v-icon title="Task löschen" @click="deleteTask(id)" style="color:#ccc;" icon="mdi-trash-can"></v-icon>

  </div>
</template>

<style></style>
