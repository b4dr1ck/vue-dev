import { createApp } from "vue";
import App from "./App.vue";

import logger from "./mixins/logger";
import focus from "./directives/focus";

const app = createApp(App);
// mixin global für die gesamte App laden
app.mixin(logger);
app.directive("focus", focus);
app.mount("#app");
