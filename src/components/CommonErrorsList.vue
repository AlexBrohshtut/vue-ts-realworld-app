<template>
  <ul class="error-messages">
    <li v-for="error in errors" :key="error">{{ error }}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommonErrorsList extends Vue {
  @Prop({ required: true }) errors!: string[];
}
</script>
