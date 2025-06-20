<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";
import FileElement from "./components/FileElement.vue";

export default {
  name: "App",
  components: {
    VFileUpload,
    FileElement,
  },
  data() {
    return {
      filesArray: [],
      allowedTypes: [
        "text/",
        "image/",
        "application/json",
        "application/javascript",
        "application/x-shellscript",
        "application/sql",
      ],
    };
  },
  methods: {
    isTextBasedContent(content) {
      // Check if the content contains mostly printable characters
      const printableCharacters = /^[\x20-\x7E\s].*$/;
      return printableCharacters.test(content);
    },
    checkAllowedType(type) {
      let check = false;
      this.allowedTypes.forEach((allowedType) => {
        if (type.startsWith(allowedType)) {
          check = true;
        }
      });
      return check;
    },
    filesUpload(files) {
      this.filesArray = [];

      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = file.type.startsWith("image/") ? file : e.target.result;
            if (this.isTextBasedContent(fileContent) || this.checkAllowedType(file.type)) {
              this.filesArray.push({ name: file.name, content: fileContent, type: file.type });
            } else {
              this.filesArray.push({ name: file.name, content: "<BINARY>", type: file.type });
            }
          };
          reader.onerror = (e) => {
            console.error(`Error reading file ${file.name}:`, e);
          };
          reader.readAsText(file); // Read the file as text
        });
      }
    },
  },
};
</script>

<template>
  <div class="ma-2">
    <v-file-upload @update:modelValue="filesUpload($event)" multiple show-size density="compact" variant="compact">
    </v-file-upload>
    <file-element v-for="(file, index) in filesArray" :key="index" :file="file" class="mt-2"></file-element>
  </div>
</template>

<style></style>
