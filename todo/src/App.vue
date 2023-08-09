<template>
  <div class="container-fluid">
    <AllTodos />
  </div>
</template>

<script>
import AllTodos from "./components/AllTodos.vue";

export default {
  name: "App",
  components: {
    AllTodos,
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~bootstrap-icons/font/bootstrap-icons.css";

body {
  background-color: rgb(50,50,50);
}
</style>
