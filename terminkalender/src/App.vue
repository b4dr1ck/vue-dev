<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
        <!-- <CalendarWeekAsList />
        <CalendarWeek /> -->
        <!--keep-alive: damit die component nicht gelöscht wird beim Wechslen der View-->
        <keep-alive>
          <component :is="activeView" /> 
        </keep-alive>
        <!-- Ende: Template für die Calendar-Week-Component -->
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <!-- Anfang: Template für die Calendar-Entry-Component -->
        <CalendarEntry />
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button
            @click="toggleDisplaySetting()"
            :class="btnSettingsClasses"
            class="btn btn-lg mb-2"
          >
            <strong class="fas fa-cogs">👁</strong>
          </button>
        </div>
        <!-- Anfang: Template für die Calendar-Settings-Component -->
        <CalendarSettings v-if="displaySetting" />
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Store from "./store";
import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarEntry from "./components/CalendarEntry.vue";
import CalendarWeekAsList from "./components/CalendarWeekAsList.vue";
// import CalendarSettings from "./components/CalendarSettings.vue";

export default {
  name: "App",
  components: {
    // Langschreibweise
    //'CalendarWeek': CalendarWeek,

    // Kurzschreibweise
    CalendarWeek,
    CalendarEntry,
    CalendarWeekAsList,
    // lade die CalendarSettings asynchron. Damit werden sie nur geladen, wenn sie auch wirklich benötigt werden.
    CalendarSettings: defineAsyncComponent(() => {
      return import(
        /*webpackChunkName: 'CalendarSettingsComponent'*/ "./components/CalendarSettings.vue"
      );
    }),
  },
  data() {
    return {
      displaySetting: false,
    };
  },
  computed: {
    btnSettingsClasses() {
      return this.displaySetting ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.state.activeView;
    }
  },
  methods: {
    toggleDisplaySetting() {
      this.displaySetting = !this.displaySetting;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

.square {
  width: 40px;
  height: 40px;
}
</style>
