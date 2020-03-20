<template>
  <div>
    <app-header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <app-footer />
  </div>
</template>

<script type="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppFooter from "@/layouts/AppFooter";
import AppHeader from "@/layouts/AppHeader";

@Component({
  components: {
    AppFooter,
    AppHeader
  }
})
export default class App extends Vue {}
</script>
