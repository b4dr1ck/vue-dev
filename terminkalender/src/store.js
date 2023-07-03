import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

// binde state in das reactivity-system von vue ein mittels der importierten Funktion reactive()
const state = reactive({
  calendarWeekData,
  activeView: "CalendarWeek",
  activeOrdering: "title",
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  activeOrdering: () => state.activeOrdering,
  events: (dayId) => {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    return dayObj.events.sort((eventA,eventB) => {
      if (eventA[state.activeOrdering] > eventB[state.activeOrdering]) {
        return 1;
      } else if (eventA[state.activeOrdering] < eventB[state.activeOrdering]) {
        return -1;
      }
      return 0;
    })
  }
};

const mutations = {
  addNewEntry(eventObj) {
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: eventObj.title,
      edit: false,
      color: eventObj.color,
      priority: Number(eventObj.priority),
    });
  },
  setActiveView(view) {
    state.activeView = view;
  },
  setActiveOrdering(ordering) {
    state.activeOrdering = ordering;
  },
  setActiveDay(dayId) {
    // setze alle auf day.active auf False
    state.calendarWeekData.forEach((day) => {
      day.active = false;
    });

    // setze das Richtige auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    dayObj.active = true;
  },
  // setze alle event.edit auf false
  editEvent(dayId, eventTitle) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => {
        event.edit = false;
      });
    });
    // setze das zu bearbeitende Event auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObject = dayObj.events.find(
      (event) => event.title === eventTitle
    );
    eventObject.edit = true;
  },
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex(
      (event) => event.title === eventTitle
    );
    console.log(eventIndex)
    dayObj.events.splice(eventIndex, 1);
  },
  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.title === oldEventTitle
    );

    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
};

export default {
  // mache state nur lesend mit der Funktion readonly()
  state: readonly(state),
  getters,
  mutations,
};
