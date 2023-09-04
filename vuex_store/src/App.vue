<template>
  <div class="container-fluid">
    <h1>Counter</h1>
    <p class="border">{{ name }}</p>
    <p class="border">{{ counter }}</p>
    <p class="border">{{ fetchText }}</p>
    <button @click="increaseCounter" class="btn btn-primary m-2" style="width: 150px">
      Counter ++
    </button>
    <br />
    <button @click="fetchData" class="btn btn-primary m-2" style="width: 150px">
      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
      <span v-else>Fetch Data</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    counter() {
      return this.$store.getters.getCount;
    },
    name() {
      return this.$store.getters.getName;
    },
    fetchText() {
      return this.$store.getters.getFetchData;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
  methods: {
    increaseCounter() {
      this.$store.commit("setCounter", 1);
    },
    fetchData() {
      this.$store.dispatch("fetchData");
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
