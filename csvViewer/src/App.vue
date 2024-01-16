<script>

export default {
  name: "App",
  data() {
    return {
      search:"",
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
        this.items = [];
        let headerLine = this.fileContent.split("\n")[0].split(this.delimiter);

        if (!this.useHeader) {
          headerLine = this.fileContent
            .split("\n")[0]
            .split(this.delimiter)
            .map((element, index) => {
              return `Column ${index}`;
            });
        }

        const headerLength = headerLine.length;
        for (let i = 0; i < headerLength; i++) {
          this.headers.push({
            title: headerLine[i],
            value: headerLine[i],
            key: headerLine[i],
          });
        }

        this.fileContent.split("\n").forEach((line, lineNr) => {
          if (this.useHeader) {
            lineNr--;
          }
          this.items[lineNr] = {};
          headerLine.forEach((title, index) => {
            this.items[lineNr][title] = line.split(this.delimiter)[index];
          });
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
      <v-btn
        class="mx-2"
        :height="55"
        block
        :disabled="btnDisabled"
        @click="convertTextToJson()"
        >Create Table <v-icon class="ms-2" icon="mdi-table-large-plus"></v-icon></v-btn
      >
    </v-col>
  </v-row>
  <hr class="mb-5" />
  <v-text-field
  class="ma-2"
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    single-line
    variant="outlined"
    hide-details
  ></v-text-field>
  <v-data-table
    v-if="items.length > 0"
    :headers="headers"
    :search="search"
    :items="items"
    items-per-page="25"
  ></v-data-table>

  <v-alert closable v-if="errorMsg" :text="errorMsg" type="error"></v-alert>
</template>

<style>
th {
  color: rgb(115, 136, 228);
  font-size: larger;
}
</style>
