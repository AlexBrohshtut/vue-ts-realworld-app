<template>
  <auth-page :mode="mode" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
