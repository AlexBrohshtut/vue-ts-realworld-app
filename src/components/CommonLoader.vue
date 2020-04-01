<template>
  <div class="loader" :style="styleVars"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommonLoader extends Vue {
  @Prop({ default: 10 }) size!: number;
  @Prop({ default: 60 }) margin!: number;

  get styleVars(): any {
    return {
      "--loader-size": `${this.size}em`,
      "--margin": `${this.margin}px`
    };
  }
}
</script>

<style scoped>
/* From https://projects.lukehaas.me/css-loaders/ */
.loader,
.loader:after {
  border-radius: 50%;
  width: var(--loader-size);
  height: var(--loader-size);
}
.loader {
  margin: var(--margin) auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(92, 184, 92, 0.2);
  border-right: 1.1em solid rgba(92, 184, 92, 0.2);
  border-bottom: 1.1em solid rgba(92, 184, 92, 0.2);
  border-left: 1.1em solid rgb(92, 184, 92);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
