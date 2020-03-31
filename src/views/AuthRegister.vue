<template>
  <auth-page :mode="mode" />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import AuthPage, { AuthPageMode } from "@/components/AuthPage.vue";

@Component({
  components: {
    AuthPage
  }
})
export default class AuthRegister extends Vue {
  mode: Readonly<AuthPageMode> = AuthPageMode.Register;
}
</script>
