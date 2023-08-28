import { createRouter, createWebHistory } from "vue-router";
// import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

import routes from "./routes";
import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    {
      // wenn kein path (oberhalb) zutrifft, lade NotFoundPage
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
      // redirect: "/", // alternativ zum wechseln auf NotFoundPage einfach einen redirect machen
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
