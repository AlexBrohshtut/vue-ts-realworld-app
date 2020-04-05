import Vue from "vue";
import VueRouter, { Location, Route } from "vue-router";

import User from "@/store/modules/User";

import { Routes } from "./routes";
import RoutesNames from "./routesNames";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: Routes
});

const requiresAuthGuard = (to: Route, from: Route, next: Function): boolean => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLoggedIn = !!User.currentUser;
    if (!isLoggedIn) {
      next({
        name: RoutesNames.authLogin,
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
    return true;
  }
  return false;
};

const anonymousOnlyGuard = (
  to: Route,
  from: Route,
  next: Function
): boolean => {
  if (to.matched.some(record => record.meta.anonymousOnly)) {
    const isAnonymous = !User.currentUser;
    if (!isAnonymous) {
      next({
        name: RoutesNames.home
      });
    } else {
      next();
    }
    return true;
  }
  return false;
};

router.beforeEach(async (to, from, next) => {
  await User.completeAuth();
  if (requiresAuthGuard(to, from, next)) {
    return;
  }
  if (anonymousOnlyGuard(to, from, next)) {
    return;
  }
  next(); // make sure to always call next()!
});

export { Location, RoutesNames };
export default router;
