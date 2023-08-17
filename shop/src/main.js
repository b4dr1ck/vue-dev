import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";

const app = createApp(App);
// use - verwende plugins (vuex ist ein plugin)
app.use(store);
app.mount("#app");
