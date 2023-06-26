<template>
  <div id="calender-week">
    <div class="card-group">
      <CalendarDay v-for="day in calenderWeekData" :key="day.id" :day="day" />
    </div>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
import Store from "../store";

export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
  data() {
    return {
      calenderWeekData: Store.state.calendarWeekData,
    };
  },
};
</script>

// scoped: das CSS gilt nur lokal für diese Component
<style scoped></style>
