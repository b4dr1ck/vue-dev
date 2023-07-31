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
    <td></td>
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
    emitFilterText() {
      this.$emit("set-filter", this.filterEntry);
    },
  },
};
</script>

<style></style>
