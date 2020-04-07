<template>
  <div>
    <github-corner />
    <app-header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <app-footer />
    <notifications position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import GithubCorner from "@/components/GithubCorner.vue";
import AppFooter from "@/layouts/AppFooter.vue";
import AppHeader from "@/layouts/AppHeader.vue";

@Component({
  components: {
    AppFooter,
    AppHeader,
    GithubCorner
  }
})
export default class App extends Vue {}
</script>
