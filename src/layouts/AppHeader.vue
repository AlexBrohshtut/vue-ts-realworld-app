<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: $routesNames.home }" class="navbar-brand">
        conduit
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li
          v-for="menuItem in menuItems"
          :key="menuItem.title"
          class="nav-item"
        >
          <router-link
            :to="{ name: menuItem.routeName }"
            :exact-active-class="`active`"
            class="nav-link"
          >
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            {{ menuItem.title }}
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :exact-active-class="`active`"
              :to="{
                name: $routesNames.profileIndex,
                params: { username: userName }
              }"
            >
              <img v-if="userImage" :src="userImage" class="user-pic" />
              {{ userName }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import User from "@/store/modules/User";

interface IMenuItem {
  title: string;
  icon?: string;
  routeName: string;
  isShow: boolean;
}

@Component
export default class AppHeader extends Vue {
  get menuItems(): IMenuItem[] {
    const menuItems = [
      {
        title: "Home",
        routeName: this.$routesNames.home,
        isShow: true
      },
      {
        title: "New Article",
        icon: "ion-compose",
        routeName: this.$routesNames.articleCreate,
        isShow: this.isLoggedIn
      },
      {
        title: "Settings",
        routeName: this.$routesNames.profileSettings,
        icon: "ion-gear-a",
        isShow: this.isLoggedIn
      },
      {
        title: "Sign up",
        routeName: this.$routesNames.authRegister,
        isShow: !this.isLoggedIn
      },
      {
        title: "Sign in",
        routeName: this.$routesNames.authLogin,
        isShow: !this.isLoggedIn
      }
    ];
    return menuItems.filter(menuItem => menuItem.isShow);
  }

  get isLoggedIn(): boolean {
    return User.isLoggedIn;
  }

  get userName(): string {
    return User.currentUser?.username || "";
  }

  get userImage(): string | null | undefined {
    return User.currentUser?.image;
  }
}
</script>
