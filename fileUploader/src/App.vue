<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default {
  name: "App",
  components: {
    VFileUpload,
  },
  data() {
    return {
      log: [],
      filesStored: [],
      filesArray: [],
      allowedTypes: ["text/", "image/", "application/json", "application/pdf"],
    };
  },
  mounted() {
    this.filesStored = [];
    fetch("http://127.0.0.1/cgi-bin/upload.py")
      .then((response) => response.json())
      .then((data) => {
        data.files.forEach((file) => {
          this.filesStored.push(file);
        });
      })
      .catch((error) => {
        console.error("Error contacting server on mount:", error);
        this.log.push({ msg: `Error contacting server on mount: ${error}`, color: "red" });
      });
  },
  methods: {
    checkAllowedType(type) {
      let check = false;
      this.allowedTypes.forEach((allowedType) => {
        if (type.startsWith(allowedType)) {
          check = true;
        }
      });
      return check;
    },

    checkFileSize(size) {
      const maxSize = 10 * 1024 * 1024; // 5 MB
      return size <= maxSize;
    },

    deleteFile(filename) {
      fetch("http://127.0.0.1/cgi-bin/upload.py", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delete: filename,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`File ${filename} deleted successfully:`, data);
          this.log.push({ msg: `File ${filename} deleted successfully`, color: "green" });
          this.filesStored = data.files;
        })
        .catch((error) => {
          console.error(`Error deleting file ${filename}:`, error);
          this.log.push({ msg: `Error deleting file ${filename}: ${error}\n`, color: "red" });
        });
    },

    uploadFileToServer(fileData) {
      fetch("http://127.0.0.1/cgi-bin/upload.py", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: fileData.name,
          content: fileData.content,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`File ${fileData.name} uploaded successfully:`, data);
          this.log.push({ msg: `File ${fileData.name} uploaded successfully`, color: "green" });
          this.filesStored = data.files;
        })
        .catch((error) => {
          console.error(`Error uploading file ${fileData.name}:`, error);
          this.log.push({ msg: `Error uploading file ${fileData.name}: ${error}\n`, color: "red" });
        });
    },

    filesUpload(files) {
      this.filesArray = [];

      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = e.target.result; // Base64-encoded content
            if (!this.checkAllowedType(file.type)) {
              console.error(`File type not allowed: ${file.type}`);
              this.log.push({ msg: `File type not allowed: ${file.type}\n`, color: "red" });
              return;
            }
            if (!this.checkFileSize(file.size)) {
              console.error(`File size too large: ${file.size} bytes`);
              this.log.push({ msg: `File size too large: ${file.size} bytes\n`, color: "red" });
              return;
            }

            const fileData = { name: file.name, content: fileContent, type: file.type };
            this.filesArray.push(fileData);
            // Send the file to the server
            this.uploadFileToServer(fileData);
          };
          reader.onerror = (e) => {
            console.error(`Error reading file ${file.name}:`, e);
            this.log.push({ msg: `Error reading file ${file.name}: ${e}\n`, color: "red" });
          };
          // Read the file as a Base64-encoded string
          reader.readAsDataURL(file);
        });
      }
    },
  },
};
</script>

<template>
  <div class="ma-2">
    <v-row>
      <v-col>
        <v-file-upload @update:modelValue="filesUpload($event)" multiple show-size density="compact" variant="compact">
          <template v-slot:item="{ props }">
            <v-file-upload-item> </v-file-upload-item>
          </template>
        </v-file-upload>
      </v-col>
    </v-row>
    <pre class="d-flex flex-column"><span :class="'text-' + msg.color" v-for="msg in log"> {{ msg.msg }}</span></pre>
    <v-list density="compact" v-if="filesStored.length > 0">
      <v-list-subheader>Uploaded Files</v-list-subheader>
      <v-list-item v-for="file in filesStored" :key="file.filename" :value="file.filename" color="primary">
        <template v-slot:prepend>
          <v-icon icon="mdi-file-image"></v-icon>
        </template>

        <v-list-item-title v-text="file.filename + ' (' + file.size + ' kB)'"></v-list-item-title>
        <template v-slot:append>
          <v-btn icon @click.stop="deleteFile(file.filename)">
            <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<style></style>
