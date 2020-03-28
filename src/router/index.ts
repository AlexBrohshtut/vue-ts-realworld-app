import Vue from "vue";
import VueRouter from "vue-router";

import RoutesNames from "./routesNames";

Vue.use(VueRouter);

const routes = [
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
    path: "/profile/:username",
    name: RoutesNames.profileIndex,
    component: () =>
      import(/* webpackChunkName: "profileIndex" */ "@/views/ProfileIndex.vue"),
    children: [
      {
        path: "/favorites",
        name: RoutesNames.profileFavorites,
        component: () =>
          import(
            /* webpackChunkName: "profileFavorites" */ "@/views/ProfileFavorites.vue"
          )
      }
    ]
  },
  {
    path: "/settings",
    name: RoutesNames.profileSettings,
    component: () =>
      import(
        /* webpackChunkName: "profileSettings" */ "@/views/ProfileSettings.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
