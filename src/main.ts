import "./registerServiceWorker";

import Vue from "vue";
import Notifications from "vue-notification";

import App from "./App.vue";
import router, { RoutesNames } from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$routesNames = RoutesNames;

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
