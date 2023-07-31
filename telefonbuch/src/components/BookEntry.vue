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
      <button title="Eintrag löschen" @click="emitEntryId()" class="btn btn-danger d-block m-auto">
        X
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "BookEntry",
  props: ["entry"],
  methods: {
    emitEntryId() {
      this.$emit('delete-entry', this.entry.id);
    },
  },
};
</script>

<style></style>
