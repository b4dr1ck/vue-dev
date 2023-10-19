<template>
  <div>
    <h1>Hello World</h1>
    <p>{{ count }}</p>
    <p>{{ counterNotes }}</p>
    <button @click="increaseCounter">Counter <b>+</b></button>
    <button @click="clearCounter">Clear Counter</button>
    <hr />
    <p>{{ person }}</p>
    <button @click="changeName('Badrick')">Change Name</button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const count = ref(0);
const increaseCounter = () => {
  count.value++;
};
const clearCounter = () => {
  count.value = 0;
};
const counterNotes = computed(() => {
    if (count.value > 10) {
      return "Counter is gettin' bigger...";
    }
    return "Counter intialized...";
});

const person = ref({name: "patrick", age: 34});
const changeName = (name) => {
  person.value.name = name;
  person.value.modified = new Date();
}


</script>

<style></style>
