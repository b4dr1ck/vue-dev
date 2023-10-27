<template>
  <div>
    <h2>Ich bin eine Component</h2>
    <slot name="text1">Slot Placeholder</slot>
    <br />
    <p>{{ pros.foo }}</p>
    <slot name="text2">Slot Placeholder</slot>
    <p>{{date}}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useDate } from "../date.js";

const pros = defineProps(["foo"]);
const date = useDate();

</script>

<style></style>
