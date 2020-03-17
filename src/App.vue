<template>
  <div>
    <vtra-header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <vtra-footer />
  </div>
</template>

<script type="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VtraFooter from "@/components/layouts/Main/VtraFooter";
import VtraHeader from "@/components/layouts/Main/VtraHeader";

@Component({
  components: {
    VtraFooter,
    VtraHeader
  }
})
export default class App extends Vue {}
</script>
