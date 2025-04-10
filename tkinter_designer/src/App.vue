<script>
import Widget from "./components/Widget.vue";
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  components: {
    Widget,
    Grid,
  },
  emits: ["click-up", "click-left", "click-right", "click-down", "delete-widget", "edit-widget", "apply-update"],
  data() {
    return {
      editWidgetRow: 0,
      editWidgetCol: 0,
      grid: [[{ name: "Label1", type: "Label", edit: true }]],
    };
  },
  computed: {
    code() {
      let codeString = "#!/usr/bin/python3\n\n" + "import tkinter as tk\n\n" + "root = tk.Tk()\n\n";

      this.grid.map((row, row_n) => {
        row.map((widget, widget_n) => {
          const widgetName = widget.name.replace(/\s+/g, "_");
          let options = Object.entries(widget)
            .filter(([key]) => key !== "name" && key !== "type" && key !== "edit" && widget[key] !== "")
            .map(([key, value]) => `${key}="${value}"`)
            .join(", ");

          codeString += `${widgetName} = tk.${widget.type}(root, ${options})\n`;
          codeString = codeString.replace("(root, )","(root)");
          codeString += `${widgetName}.grid(row=${row_n}, column=${widget_n})\n`;

        });
      });
      codeString += `\nroot.mainloop()\n`;

      return codeString;
    },
  },
  methods: {
    copyCodeContent() {
      const codeContent = this.code;
      navigator.clipboard.writeText(codeContent);
    },
    editWidget(payload) {
      const [rowIndex, colIndex] = payload;
      this.editWidgetRow = rowIndex;
      this.editWidgetCol = colIndex;

      this.grid.forEach((row) => {
        row.forEach((widget) => {
          widget.edit = false;
        });
      });
      this.grid[rowIndex][colIndex].edit = true;
    },
    deleteWidget(payload) {
      const [rowIndex, colIndex] = payload;

      this.editWidgetRow = 0;
      this.editWidgetCol = 0;

      // do not delete if the widget is in edit mode
      if (this.grid[rowIndex][colIndex].edit) {
        return;
      }
      // Remove the widget from the row
      this.grid[rowIndex].splice(colIndex, 1);

      // If the row is empty, remove the entire row
      if (this.grid[rowIndex].length === 0) {
        this.grid.splice(rowIndex, 1);
      }
    },
    clickUp(payload) {
      const [rowIndex, colIndex] = payload;
      if (rowIndex > 0) {
        this.grid[rowIndex - 1].splice(colIndex, 0, { name: "New Element", type: "Label", edit: false });
      } else {
        this.grid.unshift([{ name: "New Element", type: "Label", edit: false }]);
      }
    },
    clickDown(payload) {
      const [rowIndex, colIndex] = payload;
      if (rowIndex < this.grid.length - 1) {
        this.grid[rowIndex + 1].splice(colIndex, 0, { name: "New Element", type: "Label", edit: false });
      } else {
        this.grid.push([{ name: "New Element", type: "Label", edit: false }]);
      }
    },
    clickLeft(payload) {
      const [rowIndex, colIndex] = payload;
      this.grid[rowIndex].splice(colIndex, 0, { name: "New Element", type: "Label", edit: false });
    },
    clickRight(payload) {
      const [rowIndex, colIndex] = payload;
      this.grid[rowIndex].splice(colIndex + 1, 0, { name: "New Element", type: "Label", edit: false });
    },
    applyUpdate(payload) {
      const widgetDat = this.grid[payload[0][0]][payload[0][1]];
      const name = widgetDat.name;
      const type = widgetDat.type;
      const edit = widgetDat.edit;

      this.grid[payload[0][0]][payload[0][1]] = { name: name, type: type, edit: edit, ...payload[1] };
    },
  },
};
</script>

<template>
  <div class="ma-2">
    <h1 class="text-h3 text-center mb-5">Tkinter Desinger</h1>
    <hr />
    <div style="display: flex; justify-content: space-around;margin-bottom: 10px;">
      <div style="width: 100%">
        <p class="text-h4 text-center">Grid Layout</p>
        <grid
          @edit-widget="editWidget($event)"
          @delete-widget="deleteWidget($event)"
          @click-up="clickUp($event)"
          @click-down="clickDown($event)"
          @click-left="clickLeft($event)"
          @click-right="clickRight($event)"
          :data="grid"></grid>
      </div>
      <div style="width: 100%">
        <p class="text-h4 text-center">Widget Editor</p>
        <widget
          @apply-update="applyUpdate($event)"
          :currentData="grid[editWidgetRow][editWidgetCol]"
          :pos="[editWidgetRow, editWidgetCol]"></widget>
      </div>
    </div>
    <hr />
    <p class="text-h4 text-center">Script</p>
    <v-btn @click="copyCodeContent" icon="mdi-content-copy"></v-btn>
    <pre>{{ code }}</pre>
  </div>
</template>

<style></style>
