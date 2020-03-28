<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: routesNames.home }" class="navbar-brand">
        conduit
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link active" href="">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>
            &nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-gear-a"></i>
            &nbsp;Settings
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">Sign up</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import RoutesNames, { IRoutesNames } from "@/router/routesNames";
import User from "@/store/modules/User";

@Component
export default class AppHeader extends Vue {
  routesNames: Readonly<IRoutesNames> = RoutesNames;

  get isLoggedIn(): boolean {
    return User.isLoggedIn;
  }
}
</script>
