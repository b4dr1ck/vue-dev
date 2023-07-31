<template>
  <div>
    <div class="p-2 mb-3 bg-gray rounded">
      <small><button @click="toggleSettings" class="btn btn-secondary me-2">👁</button><b>Einstellungen</b></small>
      <div v-if="showSettings">
        <button @click="emitNewEntryVisibility" class="d-inline col-md-2 me-2 btn btn-secondary">
          {{ newEntryVisibilityText }}
        </button>
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
      newEntryVisibility: true,
      newEntryVisibilityText: '"Neuer Eintrag" ausblenden',
      filterCaseSens: true,
      showSettings: true,
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    emitNewEntryVisibility() {
      if (this.newEntryVisibility) {
        this.newEntryVisibilityText = '"Neuer Eintrag" einblenden';
      } else {
        this.newEntryVisibilityText = '"Neuer Eintrag" ausblenden';
      }

      this.newEntryVisibility = !this.newEntryVisibility;

      this.$emit("hide-new-entry", this.newEntryVisibility);
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
