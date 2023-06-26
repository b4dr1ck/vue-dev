<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <!-- Template für den Fall, dass das Event nicht bearbeitet wird (edit:false)-->
      <template v-if="!event.edit">
        <div>
          <!-- <strong>{{ priorityDisplayName }}</strong> -->
          <slot :priorityDisplayName="priorityDisplayName" name="eventPriority">
            <strong>{{ priorityDisplayName }}</strong>
            <!--Innerhalb des Slot-Tags wird der Fallback-Content angezeigt-->
          </slot>
        </div>
        <!--div>{{ event.title }}</div-->
        <slot :event="event">
          <div>{{ event.title }}</div>
        </slot>

        <div>
          <strong @click="editEvent()" class="fas fa-edit me-2" role="button"
            >✏</strong
          >
          <strong @click="deleteEvent()" class="far fa-trash-alt" role="button"
            >🗑</strong
          >
        </div>
      </template>
      <template v-else>
        <input
          type="text"
          class="form-control"
          ref="newEventTitleInput"
          :placeholder="event.title"
          @input="setNewEventTitle($event)"
        />
        <hr />
        <select class="form-select mt-2" v-model="newEventPriority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Niedrig</option>
        </select>
        <strong role="button" @click="updateEvent">✓</strong>
      </template>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "CalendarEvent",
  props: {
    event: Object,
    day: Object,
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          return "Niedrig";
        case 0:
          return "Mittel";
        case -1:
          return "Hoch";
      }
      return "Unbekannt";
    },
    alertColor() {
      return "alert-" + this.event.color;
    },
  },
  methods: {
    setNewEventTitle(event) {
      this.newEventTitle = event.target.value;
    },
    deleteEvent() {
      Store.mutations.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.day.id, this.event.title);

      // warte bis das Input-Element gerendert ist (tick ist eine Einheit, ähnlich wie ein Frame)
      this.$nextTick(() => {
        // auf die template-refs zugreifen
        this.$refs.newEventTitleInput.focus();
      });
    },
    updateEvent() {
      Store.mutations.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
  },
};
</script>

<style scoped></style>
