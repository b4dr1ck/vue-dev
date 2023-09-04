import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      name: "Vuex",
      fetchText: "...",
      isLoading: false,
    };
  },
  mutations: {
    setCounter(state, howMuch) {
      state.count += howMuch;
    },
    setName(state, name) {
      state.name = name;
    },
    setFetchText(state, text) {
      state.fetchText = text;
    },
    setIsLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    fetchData(context) {
      context.commit("setIsLoading", true);
      setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
          .then((response) => response.json())
          .then((json) => {
            context.commit("setFetchText", json);
            context.commit("setIsLoading", false);
          });
      }, 1000);
    },
  },
  getters: {
    getCount: (state) => state.count,
    getName: (state) => state.name,
    getFetchData: (state) => state.fetchText,
    getIsLoading: (state) => state.isLoading,
  },
});

export default store;
