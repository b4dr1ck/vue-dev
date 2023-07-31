<template>
  <tr id="filter">
    <td v-bind:key="'filter_' + header" v-for="header in entriesHeader">
      <input
        :id="header"
        v-model="filterEntry[header]"
        @input="emitFilterText"
        type="text"
        class="form-control d-inline"
        placeholder="..."
      />
    </td>
    <td><button @click="clearFilter" title="Filter löschen" class="btn btn-secondary d-block m-auto">C</button></td>
  </tr>
</template>

<script>
export default {
  name: "BookFilter",
  props: ["entriesHeader"],
  data() {
    return {
      filterEntry: {
        Name: "",
        Adresse: "",
        Telefon: "",
        "E-Mail": "",
      },
    };
  },
  methods: {
    clearFilter() {
      for (const key in this.filterEntry) {
        this.filterEntry[key] = "";
      }
    },
    emitFilterText() {
      this.$emit("set-filter", this.filterEntry);
    },
  },
};
</script>

<style></style>
