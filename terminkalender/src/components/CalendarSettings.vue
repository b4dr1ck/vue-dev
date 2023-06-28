<template>
  <div id="calendar-settings">
    <div class="card">
      <div class="card-header text-center bg-success text-white">
        <strong>Einstellungen</strong>
      </div>
      <div class="card-body">
        <ul class="nav nav-pills nav-fill">
          <li
            v-for="(icon, componentName) in views"
            :key="componentName"
            class="nav-item"
            role="button"
          >
            <a @click="changeActiveView(componentName)" class="nav-link"
              ><strong
                :class="istActiveView(componentName)"
                class="text-success"
                >{{ icon }}</strong
              ></a
            >
          </li>
        </ul>
        <hr />
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item" role="button">
            <a class="nav-link"
              ><strong class="fas fa-sort-numeric-down-alt text-success"
                >🔽</strong
              ></a
            >
          </li>
          <li class="nav-item" role="button">
            <a class="nav-link"
              ><strong class="fas fa-sort-alpha-down text-success"
                >🔽</strong
              ></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store";
export default {
  name: "CalendarSettings",
  data() {
    return {
      views: {
        CalendarWeek: "T",
        CalendarWeekAsList: "L",
      },
    };
  },
  methods: {
    changeActiveView(componentName) {
      Store.mutations.setActiveView(componentName);
    },
    istActiveView(componentName) {
        if (componentName === Store.state.activeView) {
            return ["border border-success"];
        }
    }
  },
};
</script>

<style scoped></style>
