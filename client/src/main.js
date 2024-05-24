import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "@/views/Home.vue";
import JobDetails from "@/views/JobDetails.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/offers/:id", name: "Job Details", component: JobDetails },
  ],
});
createApp(App).use(router).mount("#app");
