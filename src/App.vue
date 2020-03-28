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
import Vue from "vue";
import Component from "vue-class-component";

import AppFooter from "@/layouts/AppFooter.vue";
import AppHeader from "@/layouts/AppHeader.vue";

@Component({
  components: {
    AppFooter,
    AppHeader
  }
})
export default class App extends Vue {}
</script>
