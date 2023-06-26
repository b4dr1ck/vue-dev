<template>
  <div class="card border-start" :class="cardClasses">
    <div
      class="card-header text-center"
      role="button"
      :class="cardHeaderClasses"
    >
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <CalendarEvent
        v-for="event in day.events"
        :key="event.title"
        :event="event"
        :day="day"
      >
        <!--template v-slot:priorityDisplayName="slotProps"-->
        <template #eventPriority="slotProps">
          <strong>{{ slotProps.priorityDisplayName }}</strong>
        </template>
        <!-- "v-slot" ist die Kurzform von "v-slot:default"-->
        <template v-slot="{ event }">{{ event.title }}</template>
      </CalendarEvent>
    </div>
  </div>
</template>

<script>
import CalendarEvent from "./CalendarEvent.vue";
import Store from "@/store";

export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
  // ## importiere das "day"-attribut in diese Component

  // # Array-Schreibweise: wird nicht empfohlen!
  // props: ["day"],

  // # Object-Schreibweise
  // props: {
  //    // als Wert wird hier der erwartete Datentyp angegeben (können auch mehrere Typen sein: [Number, String, ...])
  //   day: Object,
  // }

  // # Mehrere Optionen für die Props
  props: {
    day: {
      type: Object,
      required: true,
      // default kann bei primitiven Datentypen einfach ein Wert sein (z.B default: 100),
      // bei komplexten Datentypen muss eine Funktion angegeben werden.
      default: function () {
        return {
          id: -1,
          fullName: "Fehlender Wochentag",
          events: [],
        };
      },
      // Werte validieren
      validator: function (value) {
        // Beispiel: validiere ob ID vorhanden ist
        if (Object.keys(value).includes("id")) {
          return true;
        }
      },
    },
  },
  computed: {
    cardClasses() {
      return this.day.id == Store.getters.activeDay().id
        ? ["border-primary"]
        : null;
    },
    cardHeaderClasses() {
      return this.day.id == Store.getters.activeDay().id
        ? ["bg-primary", "text-white"]
        : null;
    },
  },
};
</script>

<style scoped></style>
