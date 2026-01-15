<script>
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default {
  name: "App",
  components: {
    VFileUpload,
  },
  data() {
    return {
      logEnabled: true,
      log: [],
      filesStored: [],
      filesArray: [],
      url:"",
    };
  },
  mounted() {
    this.url= window.location.href + "upload.py"; // production-url
    
    if (import.meta.env.DEV) {
      this.url = "http://127.0.0.1/fileUploader/upload.py"
    }

    this.filesStored = [];
    fetch(this.url)
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
  computed: {
    arrowDir() {
      return this.logEnabled ? "right" : "left";
    },
  },
  methods: {
    deleteFile(filename) {
      fetch(this.url, {
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

    downLoadFile(filename) {
      const file = this.filesStored.find((f) => f.filename === filename);
      if (file) {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.log.push({ msg: `File ${filename} download initiated`, color: "green" });
      } else {
        this.log.push({ msg: `File ${filename} not found for download`, color: "red" });
      }
    },

    uploadFileToServer(fileData) {
      fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: fileData.name,
          content: fileData.content,
          size: fileData.size,
          type: fileData.type,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "success") {
            this.log.push({ msg: data.message, color: "red" });
            return;
          }
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
            const fileData = { name: file.name, content: fileContent, type: file.type, size: file.size };
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

    toggleLog() {
      this.logEnabled = !this.logEnabled;
    },
  },
};
</script>

<template>
  <div class="ma-2">
    <v-row>
      <v-col>
        <v-file-upload @update:modelValue="filesUpload($event)" multiple show-size density="compact" variant="compact">
        </v-file-upload>
      </v-col>
    </v-row>
    <div class="d-flex">
      <v-list width="100%" density="compact" v-if="filesStored.length > 0">
        <v-list-subheader>Uploaded Files</v-list-subheader>
        <v-list-item v-for="file in filesStored" :key="file.filename" :value="file.filename" color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-file-image"></v-icon>
          </template>

          <v-list-item-title v-text="file.filename + ' (' + file.size + ' kB)'"></v-list-item-title>
          <template v-slot:append>
            <v-btn icon @click.stop="downLoadFile(file.filename)">
              <v-icon icon="mdi-download"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="deleteFile(file.filename)">
              <v-icon icon="mdi-delete"></v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <div
        v-if="log.length > 0 || filesStored.length > 0"
        title="Toggle Log-Output"
        @click="toggleLog()"
        id="separator">
        <v-btn width="20px" height="100%">
          <v-icon :icon="'mdi-arrow-' + arrowDir"></v-icon>
        </v-btn>
      </div>
      <pre
        v-if="log.length > 0 && logEnabled"
        class="d-flex flex-column bg-black pa-2"><span :class="'text-' + msg.color" v-for="msg in log"> {{ msg.msg }}</span></pre>
      <pre v-else-if="logEnabled" class="d-flex flex-column bg-black text-green pa-2"></pre>
    </div>
  </div>
</template>

<style>
.v-file-upload-items {
  display: none !important;
}

pre {
  width: 100%;
}
</style>
