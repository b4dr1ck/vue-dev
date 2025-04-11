<script>
export default {
  name: "Widget",
  props: ["currentData", "pos"],
  data() {
    return {
      widgets: ["Label", "Button", "Entry", "Text"],
      widgetLayout: {
        padx: 0,
        pady: 0,
        sticky: "nsew",
      },
      widgetOptions: {
        Label: {
          text: "",
          fg: "",
          bg: "",
          font: "",
          anchor: "",
        },
        Button: {
          text: "",
          command: "",
          fg: "",
          bg: "",
          font: "",
          anchor: "",
        },
        Entry: {
          command: "",
          fg: "",
          bg: "",
          font: "",
          anchor: "",
        },
        Text: {
          fg: "",
          bg: "",
          height: "",
          width: "",
        },
      },
    };
  },
  watch: {
    currentData: {
      immediate: true,
      handler(newValue) {
        // Update widgetOptions with the currentData values
        if (newValue && this.widgetOptions[newValue.type]) {
          Object.keys(this.widgetOptions[newValue.type]).forEach((key) => {
            this.widgetOptions[newValue.type][key] = newValue[key] || "";
          });
        }
        if (newValue.layout && this.widgetLayout) {
          Object.keys(this.widgetLayout).forEach((key) => {
            this.widgetLayout[key] = newValue.layout[key] || "";
          });
        }
      },
    },
  },
  methods: {
    applyUpdate() {
      this.$emit("apply-update", [this.pos, this.widgetOptions[this.currentData.type], this.widgetLayout]);
    },
  },
};
</script>

<template>
  <v-card prepend-icon="mdi-pencil" class="ma-2" :title="currentData.type + ` - ${pos[0]} / ${pos[1]}`">
    <v-radio-group v-model="currentData.type" inline label="Widget Type">
      <v-radio v-for="type in widgets" :label="type" :value="type"></v-radio>
    </v-radio-group>

    <v-text-field v-model="currentData.name" class="mx-2" label="varialbe name"></v-text-field>

    <p class="mx-4 mb-5 text-grey-lighten-1">Options</p>
    <div class="d-flex flex-wrap">
      <v-text-field
        v-for="(value, key) in widgetOptions[currentData.type]"
        v-model="widgetOptions[currentData.type][key]"
        class="mx-2"
        :label="key"></v-text-field>
    </div>

    <p class="mx-4 mb-5 text-grey-lighten-1">Layout</p>
    <div class="d-flex flex-wrap">
      <v-text-field
        v-for="(value, key) in widgetLayout"
        v-model="widgetLayout[key]"
        class="mx-2"
        :label="key"></v-text-field>
    </div>
    <v-btn variant="tonal" class="ma-2" @click="applyUpdate">Apply Options</v-btn>
  </v-card>
</template>

<style scoped>
.v-card {
  border: 2px solid #1976d2 !important;
}
</style>
