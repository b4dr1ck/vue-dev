<template>
  <div>
    <button @click="showAlert(buttonText)">{{ buttonText }}</button>
    <br />
  </div>
</template>

<script>
export default {
  name: "MySexyButton",
  props: ["buttonText"],
  methods: {
    showAlert(text) {
      alert("ButtonText ist: " + text);
    },
  },
};
</script>

<style scoped>
button {
  background: pink;
  border: none;
  color: darkmagenta;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bolder;
  margin: 5px;
  width: 50px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
}
button:hover {
  background: rgb(255, 229, 234);
}
</style>
