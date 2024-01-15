<script>
import { toHandlers } from "vue";

export default {
  name: "App",
  data() {
    return {
      fileContent: "",
      items: [],
      headers: [],
      errorMsg: "",
      delimiter: ";",
      useHeader: true,
    };
  },
  computed: {
    btnDisabled() {
      if (this.fileContent === "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    convertTextToJson() {
      if (this.fileContent) {
        this.headers = [];
        let headerTitles = [];
        this.items = [];

        this.fileContent.split("\n").forEach((line, lineNr) => {
          if (this.useHeader) {
            if (lineNr === 0) {
              headerTitles = line.split(this.delimiter);
              headerTitles.forEach((title) => {
                this.headers.push({
                  title: title.toUpperCase(),
                  value: title,
                  key: title,
                });
              });
            } else {
              this.items[lineNr - 1] = {};
              headerTitles.forEach((title, index) => {
                this.items[lineNr - 1][title] = line.split(this.delimiter)[
                  index
                ];
              });
            }
          } else {
            // table without header
            this.items.push(line.split(this.delimiter));
          }
        });
      }
    },
    getUploadedFile(event) {
      const file = event[0];
      const fileReader = new FileReader();

      fileReader.addEventListener(
        "load",
        () => {
          this.fileContent = fileReader.result;
        },
        false
      );

      fileReader.addEventListener("error", (event) => {
        console.error(`Error occurred reading file: ${file.name}`);
        this.errorMsg = `Error occurred reading file: ${file.name}`;
      });

      if (file) {
        if (file.type.indexOf("text") >= 0) {
          fileReader.readAsText(file);
          this.errorMsg = "";
        } else {
          this.errorMsg = `File is not a text-file!`;
          this.fileContent = "";
        }
      }
    },
  },
};
</script>

<template>
  <h1 class="text-h3 ma-2">CSV Viewer</h1>
  <hr />
  <v-row class="ms-1 mt-1" justify="start">
    <v-col cols="4">
      <v-file-input
        chips
        show-size
        @update:modelValue="getUploadedFile($event)"
        :id="'fileUpload'"
        label="Upload CSV"
      ></v-file-input>
    </v-col>
    <v-col cols="3">
      <v-text-field
        class="overflow-hidden"
        v-model="delimiter"
        label="Delimiter"
        required
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-checkbox v-model="useHeader" label="Use Header"></v-checkbox>
    </v-col>
    <v-col class="me-5">
      <v-btn class="mx-2" :height="55" block :disabled="btnDisabled" @click="convertTextToJson()"
        >Create Table</v-btn
      >
    </v-col>
  </v-row>
  <hr class="mb-5" />
  <v-data-table
    v-if="useHeader && items.length > 0"
    :headers="headers"
    :items="items"
    items-per-page="25"
  ></v-data-table>
  <v-table v-else-if="items.length > 0">
    <tbody>
      <tr v-for="(row, key) in items" :key="key">
        <td v-for="(cell, key2) in row" :key="cell + '_' + key2">{{ cell }}</td>
      </tr>
    </tbody>
  </v-table>

  <v-alert closable v-if="errorMsg" :text="errorMsg" type="error"></v-alert>
</template>

<style>
th {
  color: rgb(115, 136, 228);
  font-size: larger;
}
</style>
