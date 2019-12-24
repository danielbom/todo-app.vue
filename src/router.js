import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "Tarefas"
    },
    component: Home
  },
  {
    path: "/client",
    name: "client",
    meta: {
      title: "Clientes"
    },
    component: () => import("./pages/Clients.vue")
  },
  {
    path: "/note",
    name: "note",
    meta: {
      title: "Notas"
    },
    component: () => import("./pages/Notes.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
