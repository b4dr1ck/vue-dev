<template>
  <th  @click="emitHeaderFiled">
    {{ header }}
  </th>
</template>

<script>
export default {
  name: "EntryHeader",
  props: ["header"],
  methods: {
    emitHeaderFiled() {
      this.$emit("sort-by-field", this.header);
    },
  },
  
};
</script>

<style scoped></style>
