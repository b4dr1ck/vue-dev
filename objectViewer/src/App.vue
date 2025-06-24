<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";
import ObjectElement from "./components/ObjectElement.vue";

export default {
  name: "App",
  components: {
    VFileUpload,
    ObjectElement,
  },
  data() {
    return {
      loading: false,
      data: {
        keyS: "String",
        keyN: 0,
        keyNan: NaN,
        keyInf: Infinity,
        keyA: [1, 2, 3],
        keyU: undefined,
        keyF: function () {
          return "function";
        },
        keyB: true,
        keyNull: null,
        keyEmpty: {},
        keyO: {
          nestedKeyS: "Nested String",
          nestedKeyN: 42,
          nestedKeyO: { A: 0, B: 1, C: { D: 2 } },
          nestedKeyA: [4, 5, 6],
          nestedKeyB: false,
          nestedKeyNull: null,
          nestedKeyEmpty: {},
        },
      }, // Default data for testing
      formattedOutput: "", // Holds the formatted output
      filter: "",
    };
  },
  computed: {
    filteredData() {
      if (!this.filter) {
        return this.formattedOutput; // Return full output if no filter is applied
      }
      // Filter the formatted output based on the filter input
      const regex = new RegExp(this.filter, "i"); // Case-insensitive regex
      return this.formattedOutput
        .split("\n")
        .filter((line) => regex.test(line)) // Filter lines that match the regex
        .join("\n"); // Join filtered lines back into a string
    },
  },
  methods: {
    fileUpload(file) {
      this.loading = true;
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            this.loading = false;
            this.data = JSON.parse(e.target.result); // Parse the JSON and update data
            this.generateFormattedOutput(); // Regenerate formatted output
          } catch (error) {
            console.error("Invalid JSON:", error);
            alert("Invalid JSON format. Please check your input.");
            this.loading = false;
          }
        };
        reader.readAsText(file); // Read the file as text
      } else {
        alert("Please upload a valid JSON file.");
        this.loading = false;
      }
    },
    pasteJson(event) {
      this.loading = true;
      // Prevent default paste behavior
      event.preventDefault();
      // Get pasted data via clipboard API
      const text = event.clipboardData.getData("text/plain");
      try {
        this.data = JSON.parse(text); // Parse the JSON and update data
        this.loading = false;
        this.generateFormattedOutput(); // Regenerate formatted output
      } catch (error) {
        this.loading = false;
        console.error("Invalid JSON:", error);
        alert("Invalid JSON format. Please check your input.");
      }
    },
    formatObject(obj, depth) {
      let result = "";
      const indent = "__".repeat(depth); // Create indentation based on depth
      const colorMapping = {
        number: "text-green",
        string: "text-blue",
        boolean: "text-red",
        null: "text-grey",
        function: "text-pink",
        default: "text-white",
      };

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let formattedKey = `<span class='${colorMapping["default"]}'>${key}</span>`; // Apply text-yellow to all keys

          if (typeof obj[key] === "object" && obj[key] !== null) {
            // If the value is an object, recurse
            if (Object.keys(obj[key]).length === 0) {
              if (Array.isArray(obj[key])) {
                result += `${indent}${formattedKey}: <span class='${colorMapping["null"]}'>[]</span>\n`;
              } else {
                result += `${indent}${formattedKey}: <span class='${colorMapping["null"]}'>{}</span>\n`;
              }
            } else {
              result += `${indent}${formattedKey}:\n`;
              result += this.formatObject(obj[key], depth + 1);
            }
          } else {
            // Handle primitive values
            let objType = typeof obj[key];
            if (
              objType === "number" ||
              objType === "string" ||
              objType === "boolean" ||
              objType === "function" ||
              obj[key] === null
            ) {
              if (obj[key] === null) {
                objType = "null";
              }
              if (objType === "string") {
                obj[key] = "'" + obj[key] + "'";
              }
              result += `${indent}${formattedKey}: <span class='${colorMapping[objType]}'>${obj[key]}</span>\n`;
            } else {
              // Handle unexpected types
              result += `${indent}${formattedKey}: <span class='text-grey'>${obj[key]}</span>\n`;
            }
          }
        }
      }
      return result;
    },
    generateFormattedOutput() {
      this.formattedOutput = this.formatObject(this.data, 0);
    },
  },
  mounted() {
    this.generateFormattedOutput(); // Generate output on mount
  },
};
</script>

<template>
  <div class="ma-1">
    <div>
      <p @paste="pasteJson($event)" class="paste text-h5 text-center"><v-icon icon="mdi-content-paste"></v-icon> Paste Json (Ctrl + V)</p>
      <p class="font-weight-thin text-center">OR</p>
      <v-file-upload
        @update:model-value="fileUpload($event)"
        title="Drag and Drop Json-File here (or click to browse)"
        density="compact"
        variant="compact"></v-file-upload>
    </div>
    <v-progress-circular v-if="loading" indeterminate color="primary" size="25" class="ma-1"></v-progress-circular>

    <div class="output mt-2">
      <v-text-field
        class="mb-2"
        v-model="filter"
        variant="outlined"
        label="Filter Json"
        density="compact"
        hide-details=""
        prepend-icon="mdi-magnify"></v-text-field>
      <pre class="overflow-x-auto" v-html="filteredData"></pre>
    </div>
    
    <div class="border pa-1 mt-5 overflow-x-auto">
      root
      <object-element :value="value" :_key="key" v-for="(value, key) in data" />
    </div>
  </div>
</template>

<style>
.output {
  max-width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
}
.paste {
  border: 1px dashed #ccc;
  padding: 10px;
}
</style>
