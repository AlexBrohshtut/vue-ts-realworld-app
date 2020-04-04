<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: $routesNames.profileIndex,
        params: { username: authorUsername }
      }"
    >
      <img :src="authorImage" />
    </router-link>
    <div class="info">
      <router-link
        :to="{
          name: $routesNames.profileIndex,
          params: { username: authorUsername }
        }"
        class="author"
      >
        {{ authorUsername }}
      </router-link>
      <span class="date">{{ articleDate }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DateUtils from "@/utils/DateUtils";
@Component
export default class ArticleMeta extends Vue {
  @Prop({ required: true }) createdAt!: Date;
  @Prop() authorImage!: string;
  @Prop({ required: true }) authorUsername!: string;

  get articleDate(): string {
    return DateUtils.yearMonthDayWeekdayFormat(this.createdAt);
  }
}
</script>
