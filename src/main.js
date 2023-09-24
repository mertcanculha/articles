import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./assets/css/index.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueToast);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Dashboard from "./pages/dashboard.vue";
import ArticleDeteail from "./pages/articleDetail.vue";
import ArticleList from "./pages/articleList.vue";

// ROUTER
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/article-detail/:id/",
      name: "article-detail",
      component: ArticleDeteail,
    },
    {
      path: "/article-list",
      component: ArticleList,
    },
  ],
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

import "bootstrap/dist/js/bootstrap.js";