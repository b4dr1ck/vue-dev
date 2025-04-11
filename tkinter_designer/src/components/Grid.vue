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
    };
  },
  methods: {
    editWidget(row_n, widget_n) {
      this.$emit("edit-widget", [row_n, widget_n]);
    },
    deleteWidget(row_n, widget_n) {
      this.$emit("delete-widget", [row_n, widget_n]);
    },
    clickUp(row_n, widget_n) {
      this.$emit("click-up", [row_n, widget_n]);
    },
    clickLeft(row_n, widget_n) {
      this.$emit("click-left", [row_n, widget_n]);
    },
    clickRight(row_n, widget_n) {
      this.$emit("click-right", [row_n, widget_n]);
    },
    clickDown(row_n, widget_n) {
      this.$emit("click-down", [row_n, widget_n]);
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
        style="border: 2px solid white; width: 100%; height: 200px; display: flex; justify-content: space-between"
        v-for="(widget, widget_n) in row">
        <!-- Button LEFT-->
        <v-btn
          density="compact"
          @click.left="clickLeft(row_n, widget_n)"
          class="hover-button"
          prepend-icon="mdi-table-column-plus-before"
          style="height: 100%; font-size: larger"></v-btn>
        <div style="width: 100%; display: flex; flex-direction: column; justify-content: space-between">
          <!-- Button UP-->
          <v-btn
            @click.left="clickUp(row_n, widget_n)"
            class="hover-button"
            prepend-icon="mdi-table-row-plus-before"
            style="width: 100%; font-size: larger"></v-btn>
          <p style="text-align: center">
            {{ `${widget.name}` }}
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
          <v-btn
            @click.left="clickDown(row_n, widget_n)"
            class="hover-button"
            prepend-icon="mdi-table-row-plus-after"
            style="width: 100%; font-size: larger"></v-btn>
        </div>
        <!-- Button RIGHT-->
        <v-btn
          density="compact"
          @click.left="clickRight(row_n, widget_n)"
          class="hover-button"
          prepend-icon="mdi-table-column-plus-after"
          style="height: 100%; font-size: larger"></v-btn>
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
  cursor: pointer;
}
.hover-button {
  opacity: 0;
}
.hover-button:hover {
  opacity: 1;
}
</style>
