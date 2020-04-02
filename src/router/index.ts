import Vue from "vue";
import VueRouter, { Location, RouteConfig } from "vue-router";

import RoutesNames from "./routesNames";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: RoutesNames.home,
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/login",
    name: RoutesNames.authLogin,
    component: () =>
      import(/* webpackChunkName: "authLogin" */ "@/views/AuthLogin.vue")
  },
  {
    path: "/register",
    name: RoutesNames.authRegister,
    component: () =>
      import(/* webpackChunkName: "authRegister" */ "@/views/AuthRegister.vue")
  },
  {
    path: "/editor",
    name: RoutesNames.articleCreate,
    component: () =>
      import(
        /* webpackChunkName: "articleCreate" */ "@/views/ArticleCreate.vue"
      )
  },
  {
    path: "/editor/:slug",
    name: RoutesNames.articleEdit,
    component: () =>
      import(/* webpackChunkName: "articleEdit" */ "@/views/ArticleEdit.vue")
  },
  {
    path: "/article/:slug",
    name: RoutesNames.articleView,
    component: () =>
      import(/* webpackChunkName: "articleView" */ "@/views/ArticleView.vue")
  },
  {
    path: "/@:username/:tabId?",
    name: RoutesNames.profileIndex,
    component: () =>
      import(/* webpackChunkName: "profileIndex" */ "@/views/ProfileIndex.vue")
  },
  {
    path: "/settings",
    name: RoutesNames.profileSettings,
    component: () =>
      import(
        /* webpackChunkName: "profileSettings" */ "@/views/ProfileSettings.vue"
      )
  },
  {
    path: "*",
    redirect: { name: RoutesNames.home }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export { Location, RoutesNames };
export default router;
