<template>
  <tr>
    <td>
      {{ entry.name }}
    </td>
    <td>
      {{ entry.address }}
    </td>
    <td>
      {{ entry.phone }}
    </td>
    <td>
      {{ entry.email }}
    </td>
    <td class="text-right">
      <button @click="emitEntryId()" class="btn btn-danger d-block m-auto">
        X
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "EntryComponent",
  props: ["entry"],
  methods: {
    emitEntryId() {
      this.$emit('delete-entry', this.entry.id);
    },
  },
};
</script>

<style></style>
