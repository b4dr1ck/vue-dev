<template>
  <div>
    <div class="p-2 mb-3 bg-gray rounded">
      <p role="button" @click="toggleSettings" class="fs-5 mb-0">Einstellungen</p>
      <div v-if="showSettings">
        <button @click="emitFilterVisibility" class="d-inline col-md-2 btn btn-secondary">
          {{ filterVisibilityText }}
        </button>
        <label class="m-2" for="checkbox_casesens">
          <input @click="emitFilterCaseSens" v-model="filterCaseSens" type="checkbox" id="checkbox_casesens" />
          Case-Sensitive
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookSettings",
  data() {
    return {
      filterVisibility: true,
      filterVisibilityText: "Filter ausblenden",
      filterCaseSens: true,
      showSettings: true,
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    emitFilterVisibility() {
      if (this.filterVisibility) {
        this.filterVisibilityText = "Filter einblenden";
      } else {
        this.filterVisibilityText = "Filter ausblenden";
      }

      this.filterVisibility = !this.filterVisibility;

      this.$emit("toggle-filter", this.filterVisibility);
    },
    emitFilterCaseSens() {
      this.$emit("filter-casesense", !this.filterCaseSens);
    },
  },
};
</script>

<style></style>
