<script>
export default {
  name: "FileElement",
  props: ["file"],
  data() {
    return {
      maxContent: 500,
      imageDataUrl: null,
      typeIcons: {
        "text/": "mdi-file-document",
        "image/": "mdi-file-image",
        "application/json": "mdi-code-json",
        "application/javascript": "mdi-language-javascript",
        "application/x-shellscript": "mdi-script-text",
        "application/sql": "mdi-database-search",
      },
    };
  },
  computed: {
    isImage() {
      return this.file.type.startsWith("image/"); // Check if the file type is an image
    },
    textColor() {
      if (this.file.color) {
        return this.file.color; // Use the color from the file object if provided
      }
    },
    showIcon() {
      // Determine the icon to show based on the file type
      for (const type in this.typeIcons) {
        if (this.file.type.startsWith(type)) {
          return this.typeIcons[type];
        }
      }
      return "mdi-file"; // Default icon if no match found
    },
  },
  methods: {
    convertToDataUrl() {
      if (this.isImage && this.file.content instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageDataUrl = e.target.result; // Store the data URL
        };
        reader.readAsDataURL(this.file.content); // Convert Blob to data URL
      }
    },
  },
  mounted() {
    this.convertToDataUrl();
  },
};
</script>

<template>
  <div>
    <h3 class="text-indigo-lighten-1 text-h5">
      <v-icon class="mr-2" :icon="showIcon" /> {{ file.name }} ({{ file.type }})
    </h3>
    <!-- Render image if file type is an image -->
    <div v-if="isImage">
      <img :src="imageDataUrl" alt="Uploaded Image" style="max-width: 500px" />
    </div>
    <!-- Render text content for non-image files -->
    <div v-else>
      <pre style="max-height: 500px;" :class="`border pa-1 overflow-y-scroll overflow-x-scroll text-${textColor}`">{{
        file.content
      }}</pre>
    </div>
  </div>
</template>

<style></style>
