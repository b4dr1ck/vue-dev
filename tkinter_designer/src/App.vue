<script>
import Widget from "./components/Widget.vue";
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  components: {
    Widget,
    Grid,
  },
  emits: [
    "add-row-up",
    "add-col-left",
    "add-col-right",
    "add-row-down",
    "delete-widget",
    "edit-widget",
    "apply-update",
    "update-metadata",
  ],
  data() {
    return {
      title: "",
      geometry: "",
      editWidgetRow: 0,
      editWidgetCol: 0,
      grid: [[{ name: "New Element", type: "Label", edit: true, layout: { padx: "5", pady: "5", sticky: "ew" } }]],
    };
  },
  computed: {
    code() {
      const maxCols = Math.max(...this.grid.map((row) => row.length));
      let codeString = "#!/usr/bin/python3\n\n" + "import tkinter as tk\n\n" + "root = tk.Tk()\n\n";

      // Set the title
      if (this.title) {
        codeString += `root.title("${this.title}")\n`;
      }

      // Set the geometry
      if (this.geometry) {
        codeString += `root.geometry("${this.geometry}")\n\n`;
      }

      // Configure the grid
      for (let n = 0; n < maxCols; n++) {
        codeString += `root.grid_columnconfigure(${n}, weight=1)\n`;
      }

      // Set the options and layout for each widget
      codeString += "\n";
      this.grid.map((row, row_n) => {
        row.map((widget, widget_n) => {
          const widgetName = widget.name.replace(/\s+/g, "_");
          let options = Object.entries(widget)
            .filter(
              ([key]) => key !== "name" && key !== "type" && key !== "edit" && key !== "layout" && widget[key] !== ""
            )
            .map(([key, value]) => {
              if (key === "font") {
                return `${key}=(${value})`;
              }
            })
            .join(", ");

          codeString += `${widgetName} = tk.${widget.type}(root, ${options})\n`;
          codeString = codeString.replace("(root, )", "(root)");

          let layout = Object.entries(widget.layout)
            .map(([key, value]) => {
              return `${key}="${value}"`;
            })
            .join(", ");

          codeString += `${widgetName}.grid(row=${row_n}, column=${widget_n}, columnspan=${Math.floor(
            maxCols / row.length
          )}, ${layout})\n`;
        });
      });
      codeString += `\nroot.mainloop()\n`;

      return codeString;
    },
  },
  methods: {
    createNewElement() {
      return {
        name: "New Element",
        type: "Label",
        edit: false,
        layout: { padx: "5", pady: "5", sticky: "ew" },
      };
    },
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

      // Remove the widget from the row
      this.grid[rowIndex].splice(colIndex, 1);

      // If the row is empty, remove the entire row
      if (this.grid[rowIndex].length === 0) {
        this.grid.splice(rowIndex, 1);
      }
    },
    addRowUp(payload) {
      const [rowIndex, colIndex] = payload;
      if (rowIndex > 0) {
        this.grid[rowIndex - 1].splice(colIndex, 0, this.createNewElement());
      } else {
        this.grid.unshift([this.createNewElement()]);
      }
    },
    addRowDown(payload) {
      const [rowIndex, colIndex] = payload;
      if (rowIndex < this.grid.length - 1) {
        this.grid[rowIndex + 1].splice(colIndex, 0, this.createNewElement());
      } else {
        this.grid.push([this.createNewElement()]);
      }
    },
    addColLeft(payload) {
      const [rowIndex, colIndex] = payload;
      this.grid[rowIndex].splice(colIndex, 0, this.createNewElement());
    },
    addColRight(payload) {
      const [rowIndex, colIndex] = payload;
      this.grid[rowIndex].splice(colIndex + 1, 0, this.createNewElement());
    },
    applyUpdate(payload) {
      const widgetData = this.grid[payload[0][0]][payload[0][1]];
      const name = widgetData.name;
      const type = widgetData.type;
      const edit = widgetData.edit;

      this.grid[payload[0][0]][payload[0][1]] = {
        name: name,
        type: type,
        edit: edit,
        ...payload[1],
        layout: { ...payload[2] },
      };
    },
    updateMetaData(payload) {
      this.title = payload[0];
      this.geometry = payload[1];
    },
  },
};
</script>

<template>
  <div class="ma-2">
    <h1 class="text-h3 text-center mb-5">Tkinter Desinger</h1>
    <hr />
    <div class="mt-5" style="display: flex; justify-content: space-around; margin-bottom: 10px">
      <div style="width: 100%">
        <p class="text-h4 text-center">Grid Layout</p>
        <grid
          @edit-widget="editWidget($event)"
          @delete-widget="deleteWidget($event)"
          @add-row-up="addRowUp($event)"
          @add-row-down="addRowDown($event)"
          @add-col-left="addColLeft($event)"
          @add-col-right="addColRight($event)"
          @update-metadata="updateMetaData($event)"
          :data="grid"></grid>
      </div>
      <div style="width: 100%">
        <p class="text-h4 text-center">Widget Editor</p>
        <widget
          style="position: sticky; top: 0"
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
