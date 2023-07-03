<template>
  <div class="card border-start" :class="cardClasses">
    <div class="card-header text-center" role="button" :class="cardHeaderClasses" @click="setActiveDay">
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <transition name="fade" mode="out-in">
        <div v-if="day.events.length">
          <!-- verwende transition-group damit die transition nicht direkt auf der Component angewendent wird,
          sondern auf allen Elementen darunter => in diesem Fall die Events-->
          <transition-group name="list">
            <CalendarEvent v-for="event in events" :key="event.title" :event="event" :day="day">
              <!--template v-slot:priorityDisplayName="slotProps"-->
              <template #eventPriority="slotProps">
                <strong>{{ slotProps.priorityDisplayName }}</strong>
              </template>
              <!-- "v-slot" ist die Kurzform von "v-slot:default"-->
              <template v-slot="{ event }">{{ event.title }}</template>
            </CalendarEvent>
          </transition-group>
        </div>
        <div v-else>
          <div class="alert alert-light text-center">
            <i>Keine Termine</i>
          </div>
        </div>
      </transition>
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
      return this.day.id == Store.getters.activeDay().id ? ["border-primary"] : null;
    },
    cardHeaderClasses() {
      return this.day.id == Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
    },
    events() {
      return Store.getters.events(this.day.id);
    }
  },
  methods: {
    setActiveDay() {
      Store.mutations.setActiveDay(this.day.id);
    },
  },
};
</script>

<style scoped>
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  /*.list-enter-to,
  .list-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }*/

  .list-enter-active,
  .list-leave-active {
    transition: all 0.25s ease;
  }

  .list-move {
    transition: transform 0.8s ease;
  }

</style>
