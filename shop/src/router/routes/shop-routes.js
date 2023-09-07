import CreateProductPage from "@/pages/CreateProductPage";
import ShopPage from "@/pages/ShopPage";
import ReadProductPage from "@/pages/ReadProductPage";

const shopRoutes = [
  {
    path: "/shop",
    component: ShopPage,
    meta: {
      requiresAuth: true,
    },
  },
  // Alternative Layout-Strategie
  {
    path: "/v2/shop",
    component: () => import("@/layouts/v2/TheShopLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/pages/v2/ShopPage.vue"),
      },
      // {
      //   path: "create/product",
      //   component: () => import("@/pages/v2/CreateProductPage.vue"),
      // },
    ],
  },
  {
    path: "/shop/create/product",
    component: CreateProductPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shop/read/product/:id", // dynamische Inhalte mit :
    name: "ReadProduct", // named Route
    component: ReadProductPage,
    props: true, // die dyamischen Parameter (:id) werden automatisch an die Props übergeben
    meta: {
      requiresAuth: true,
      enterTransition: "rubberBand",
    },
  },
];

export default shopRoutes;
