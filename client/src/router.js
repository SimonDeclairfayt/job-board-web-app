import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import JobDetails from "@/views/JobDetails.vue";
import AdminHome from "@/views/AdminHome.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminOfferDetails from "@/views/AdminOfferDetails.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/offers/:id", name: "Job Details", component: JobDetails },
  { path: "/admin", name: "Admin home page", component: AdminHome },
  { path: "/admin/login", name: "Admin login page", component: AdminLogin },
  {
    path: "/admin/offers/:id",
    name: "Admin offers Details",
    component: AdminOfferDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
