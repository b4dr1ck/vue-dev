<template>
  <div id="calender-week">
    <div class="card-group">
      <CalendarDay v-for="i in 7" :key="i" />
    </div>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
};
</script>

// scoped: das CSS gilt nur lokal für diese Component
<style scoped></style>
