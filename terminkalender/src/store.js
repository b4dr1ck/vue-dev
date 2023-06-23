import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

// binde state in das reactivity-system von vue ein mittels der importierten Funktion reactive()
const state = reactive({
  calendarWeekData,
});

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
};

const mutations = {};

export default {
    // mache state nur lesend mit der Funktion readonly()
  state: readonly(state), 
  getters,
  mutations,
};
