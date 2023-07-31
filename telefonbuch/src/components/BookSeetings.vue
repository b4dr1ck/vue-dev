<template>
  <div>
    <small><b>Einstellungen</b></small>
    <div class="p-2 mb-3 bg-gray">
      <button @click="emitFilterVisibility" class="d-inline col-md-2 btn btn-secondary">
        {{ filterVisibilityText }}
      </button>
      <label class="col-md-2 m-2" for="checkbox_casesens">
        <input @click="emitFilterCaseSens" v-model="filterCaseSens" type="checkbox" id="checkbox_casesens" />
        Case-Sensitive
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookSettings",
  data() {
    return {
      filterVisibility: true,
      filterVisibilityText: "Filter einblenden",
      filterCaseSens: true,
    };
  },
  methods: {
    emitClearFilter() {
        this.$emit("clear-filter");
    },
    emitFilterVisibility() {
      this.filterVisibility = !this.filterVisibility;
      if (this.filterVisibility) {
        this.filterVisibilityText = "Filter einblenden";
      } else {
        this.filterVisibilityText = "Filter ausblenden";
      }

      this.$emit("toggle-filter", this.filterVisibility);
    },
    emitFilterCaseSens() {
      this.$emit("filter-casesense", !this.filterCaseSens);
    },
  },
};
</script>

<style></style>
