import store from "../../store";

const appRoutes = [
  {
    path: "/",
    alias: "/home",
    component: () => import("@/pages/HomePage.vue"), //dynamisches importieren einer Component
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next("/shop");
      } else {
        next();
      }
    },
  },
];

export default appRoutes;
