<template>
  <div>
    <h1>{{ msg }}</h1>
    <MySexyButtonVue buttonText="OK" />
    <MySexyButtonVue buttonText="NOK" />
    <MySexyButtonVue buttonText="FUK" />
  </div>
</template>

<script>
import MySexyButtonVue from "./components/MySexyButton.vue";

export default {
  name: "App",
  components: {
    MySexyButtonVue,
  },
  data() {
    return {
      msg: "Hello World",
    };
  },
};
</script>

<style>
* {
  font-family: "Arial";
}

h1 {
  color: blueviolet;
}
</style>
