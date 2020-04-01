<template>
  <div>
    <app-header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppFooter from "@/layouts/AppFooter.vue";
import AppHeader from "@/layouts/AppHeader.vue";
import User from "@/store/modules/User";

@Component({
  components: {
    AppFooter,
    AppHeader
  }
})
export default class App extends Vue {
  async created(): Promise<void> {
    if (User.authToken) {
      await User.fetchCurrentUser();
    }
  }
}
</script>
