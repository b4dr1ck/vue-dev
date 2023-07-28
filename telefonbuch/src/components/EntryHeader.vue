<template>
  <th :class="sortActive" @click="emitHeaderFiled">
    {{ header }}
  </th>
</template>

<script>
export default {
  name: "EntryHeader",
  props: ["header", "sortBy", "sortASC"],
  methods: {
    emitHeaderFiled() {
      const sortASC = !this.sortASC;

      this.$emit("sort-by-field", {
        header: this.header,
        sortASC: sortASC,
      });
    },
  },
  computed: {
    sortActive() {
      let classes = [];
      if (this.sortASC) {
        classes.push("sort-asc");
      } else {
        classes.push("sort-desc");
      }
      if (this.sortBy === this.header) {
        classes.push("sort-active");
      }
      console.log(classes)
      return classes;
    },
  },
};
</script>

<style scoped>
.sort-active {
  background-color: lightgray;
}
.sort-active.sort-asc::after {
  content: " ↓ ";
}
.sort-active.sort-desc::after {
  content: " ↑ ";
}
</style>
