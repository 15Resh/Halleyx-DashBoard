import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import ConfigureDashboard from "@/views/ConfigureDashboard.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/configure-dashboard",
    name: "ConfigureDashboard",
    component: ConfigureDashboard,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
