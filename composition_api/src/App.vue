<template>
  <div>
    <h1>{{ getGreeting }} -- {{ greetingRevers }}</h1>
    <button @click="updateGreeting">Begrüßung ändern</button>
    <hr />
    <h2>{{ greetingObj.message }} - {{ greetingObj.description }} -- {{ greetingObj.info }}</h2>
    <h2>{{ message }} - {{ description }}</h2>
    <button @click="updateGreetingObj">Begrüßung ändern</button>
  </div>
</template>

<script setup>
// Composition API
import { ref, reactive, toRefs, computed, onMounted } from "vue";

// ref() für primitve Datentypen (String, Number, ...)
const getGreeting = ref("Hello World");
const updateGreeting = () => {
  return (getGreeting.value = "Herzlich Willkommen!");
};
// verwende computed-Properties mit computed()
const greetingRevers = computed(() => {
  return getGreeting.value.split("").reverse().join("");
});

// reactive() für nicht-primitve Datentypen (Objects, ...)
const greetingObj = reactive({
  message: "Salut",
  description: "Willkommen zur App!",
  info: "info",
});

/* Destructoring funktioniert nicht, da sonst die Reactivität verloren geht.
Daher muss man toRefs verwenden um die Eigenschaften reaktiv zu machen*/
const greetingObjRefs = toRefs(greetingObj);
const { message, description } = greetingObjRefs;
const updateGreetingObj = () => {
  greetingObj.message = "Servus";
  greetingObj.description = "Herzlich Willkommen zur App";
};

// Life-Cycle Hook
onMounted(() => {
  console.log("Component mounted...");
});
</script>

<style></style>
