import { RouteConfig } from "vue-router";

import RoutesNames from "./routesNames";

export const Routes: RouteConfig[] = [
  {
    path: "/",
    name: RoutesNames.home,
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/login",
    name: RoutesNames.authLogin,
    component: () =>
      import(/* webpackChunkName: "authLogin" */ "@/views/AuthLogin.vue"),
    meta: {
      anonymousOnly: true
    }
  },
  {
    path: "/register",
    name: RoutesNames.authRegister,
    component: () =>
      import(/* webpackChunkName: "authRegister" */ "@/views/AuthRegister.vue"),
    meta: {
      anonymousOnly: true
    }
  },
  {
    path: "/editor",
    name: RoutesNames.articleCreate,
    component: () =>
      import(
        /* webpackChunkName: "articleCreate" */ "@/views/ArticleCreate.vue"
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/editor/:slug",
    name: RoutesNames.articleEdit,
    component: () =>
      import(/* webpackChunkName: "articleEdit" */ "@/views/ArticleEdit.vue"),
    meta: {
      requiresAuth: true
    }
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
      ),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    redirect: { name: RoutesNames.home }
  }
];
