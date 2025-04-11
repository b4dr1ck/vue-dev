<script>
export default {
  name: "Grid",

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "",
      geometry: "",
      icons: {
        Label: 'mdi-label-outline',
        Button: 'mdi-button-pointer',
        Entry: 'mdi-form-textbox',
        Text: 'mdi-text-box-outline',
        Checkbutton: 'mdi-checkbox-marked-outline',
      }
    };
  },
  methods: {
    editWidget(row_n, widget_n) {
      this.$emit("edit-widget", [row_n, widget_n]);
    },
    deleteWidget(row_n, widget_n) {
      this.$emit("delete-widget", [row_n, widget_n]);
    },
    addRowUp(row_n, widget_n) {
      this.$emit("add-row-up", [row_n, widget_n]);
    },
    addColLeft(row_n, widget_n) {
      this.$emit("add-col-left", [row_n, widget_n]);
    },
    addColRight(row_n, widget_n) {
      this.$emit("add-col-right", [row_n, widget_n]);
    },
    addRowDown(row_n, widget_n) {
      this.$emit("add-row-down", [row_n, widget_n]);
    },
    emitMetaData() {
      this.$nextTick(() => {
        this.$emit("update-metadata", [this.title, this.geometry]);
      });
    },
  },
};
</script>

<template>
  <div class="border border-lg pa-2">
    <!--Meta-Data-->
    <div class="d-flex">
      <v-text-field
        class="mx-2"
        @update:model-value="emitMetaData"
        v-model="title"
        placeholder="Application Title"
        variant="solo-filled"></v-text-field>
      <v-text-field
        class="mx-2"
        @update:model-value="emitMetaData"
        v-model="geometry"
        placeholder="Window Size (width x height)"
        variant="solo-filled"></v-text-field>
    </div>
    <!-- Grid -->
    <div class="d-flex flex-1-1-100" v-for="(row, row_n) in data">
      <div
        :class="widget.edit ? 'ma-2 widgetContainer active' : 'ma-2 widgetContainer'"
        style="border: 2px solid white; width: 100%; height: 120px; display: flex; justify-content: space-between"
        v-for="(widget, widget_n) in row">
        <!-- Button LEFT-->
        <div
          @click.left="addColLeft(row_n, widget_n)"
          class="hover-button"
          style="height: 100%; width:20px; background-color: #4A148C;"></div>
        <div style="width: 100%; display: flex; flex-direction: column; justify-content: space-between">
          <!-- Button UP-->
          <div
            @click.left="addRowUp(row_n, widget_n)"
            class="hover-button"
            style="height: 20px; width:100%; background-color: #4A148C;"></div>
          <p style="text-align: center">
            {{ `${widget.name} (${widget.type})` }} <v-icon :icon="icons[widget.type]"></v-icon>
            <br />
            <!-- Button edit/delete-->
            <v-btn @click.left="editWidget(row_n, widget_n)" class="mx-2" icon="mdi-pencil"></v-btn>
            <v-btn
              v-if="!widget.edit"
              @click.left="deleteWidget(row_n, widget_n)"
              class="mx-2"
              icon="mdi-delete"></v-btn>
          </p>
          <!-- Button DOWN-->
          <div
            @click.left="addRowDown(row_n, widget_n)"
            class="hover-button"
            style="height: 20px; width:100%; background-color: #4A148C;"></div>
        </div>
        <!-- Button RIGHT-->
        <div
          @click.left="addColRight(row_n, widget_n)"
          class="hover-button"
          style="height: 100%; width:20px; background-color: #4A148C;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  border: 2px solid #1976d2 !important;
}
.widgetContainer:hover {
  border: 2px solid #1976d2 !important;
}
.hover-button {
  opacity: 0.25;
  cursor: pointer;
}
.hover-button:hover {
  opacity: 1;
}
</style>
