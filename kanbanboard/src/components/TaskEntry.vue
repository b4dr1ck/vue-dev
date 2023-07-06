<template>
  <div class="alert" :class="alertClass">{{ task.content }}</div>
</template>

<script>
export default {
  name: "TaskEntry",
  props:["task","alertColor"],
  computed: {
    alertClass() {
      return `alert-${this.alertColor}`;
    }
  }
};
</script>

<style scoped></style>
