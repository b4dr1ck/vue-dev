<script>
import Color from "./Color.vue";

export default {
  name: "Task",
  components: {
    Color,
  },
  props: ["title", "text", "id", "color", "lock"],
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
      return this.lock ? "white" : "rgba(0,0,0,0.7)";
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
    updateLock(value) {
      this.$emit("update-lock", { id: this.id });
    },
  },
};
</script>

<template>
  <div :class="`bg-${color} pa-2`">
    <div class="d-flex">
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
      label="Titel"
      density="compact"
      :model-value="title"
      variant="solo-filled"></v-text-field>
    <v-textarea
      :readonly="lock"
      :bg-color="color"
      auto-grow
      @update:modelValue="updateText($event)"
      label="Text"
      density="compact"
      :model-value="text"
      variant="solo-filled">
    </v-textarea>
    <v-icon @click="updateLock(id)" :style="`color:${lockActive};`" icon="mdi-lock"></v-icon>
  </div>
</template>

<style></style>
