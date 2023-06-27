<template>
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Neuer Termin für: <strong>{{ activeDayName }}</strong>
        </h5>
      </div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          placeholder="Neuer Eintrag"
          v-model="event.title"
          @keyup.enter.exact="addNewEntry"
          @keyup.ctrl.enter.exact="resetEventTitle"
        />
        <select class="form-select mt-2" v-model="event.priority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Niedrig</option>
        </select>
        <div class="text-center mt-3">
          <span
            v-for="color in eventColors"
            :key="color"
            class="d-inline-block alert m-0 me-2 square"
            :class="eventColorClasses(color)"
            role="button"
            @click="setEventColor(color)"
          >
          </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button
            :disabled="submitEventBtnStatus"
            @click="addNewEntry"
            class="btn btn-primary"
          >
            Eintragen
          </button>
          <button @click="resetEventTitle" class="btn btn-danger">Inhalt löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      },
    };
  },
  computed: {
    submitEventBtnStatus() {
      // gib false zurück wenn title leer ist. Somit bleibt das Disabled-Attribut auf False
      return this.event.title === "";
    },
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
  },
  methods: {
    eventColorClasses(eventColor) {
      return [
        "alert-" + eventColor,
        this.event.color === eventColor
          ? "border border-" + this.event.color
          : "",
      ];
    },
    setEventColor(eventColor) {
      this.event.color = eventColor;
    },
    addNewEntry() {
      Store.mutations.addNewEntry(this.event);

      // Event zurücksetzen nachdem ein Eintrag gemacht wurde
      this.event.title = "";
      this.event.priority = 0;
      this.event.color = "primary";
    },
    resetEventTitle() {
        this.event.title = "";
    }
  },
};
</script>

<style scoped></style>
