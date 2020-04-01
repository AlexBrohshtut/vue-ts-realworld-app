<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: routesNames.home }" class="navbar-brand">
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
            <a href="#" class="nav-link" @click.prevent="goToProfile">
              {{ userName }}
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">Sign out</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import RoutesNames, { IRoutesNames } from "@/router/routesNames";
import User from "@/store/modules/User";

interface IMenuItem {
  title: string;
  icon?: string;
  routeName: string;
  isShow: boolean;
}

@Component
export default class AppHeader extends Vue {
  routesNames: Readonly<IRoutesNames> = RoutesNames;

  get menuItems(): IMenuItem[] {
    const menuItems = [
      {
        title: "Home",
        routeName: RoutesNames.home,
        isShow: true
      },
      {
        title: "New Post",
        icon: "ion-compose",
        routeName: RoutesNames.articleCreate,
        isShow: this.isLoggedIn
      },
      {
        title: "Settings",
        routeName: RoutesNames.profileSettings,
        icon: "ion-gear-a",
        isShow: this.isLoggedIn
      },
      {
        title: "Sign up",
        routeName: RoutesNames.authRegister,
        isShow: !this.isLoggedIn
      },
      {
        title: "Sign in",
        routeName: RoutesNames.authLogin,
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

  logout(): void {
    User.logout();
    this.$router.push({ name: RoutesNames.home });
  }
  goToProfile(): void {
    this.$router.push({
      name: RoutesNames.profileIndex,
      params: { username: this.userName }
    });
  }
}
</script>
