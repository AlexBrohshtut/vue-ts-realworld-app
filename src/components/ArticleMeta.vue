<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: $routesNames.profileIndex,
        params: { username: author.username }
      }"
    >
      <img :src="authorImage" />
    </router-link>
    <div class="info">
      <router-link
        :to="{
          name: $routesNames.profileIndex,
          params: { username: author.username }
        }"
        class="author"
      >
        {{ author.username }}
      </router-link>
      <span class="date">{{ articleDate }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IArticle, IProfile } from "@/services/realWorldApi/models";
import Profile from "@/store/modules/Profile";
import DateUtils from "@/utils/DateUtils";
@Component
export default class ArticleMeta extends Vue {
  @Prop({ required: true }) article!: IArticle;

  isLoading = false;

  get articleDate(): string {
    return DateUtils.yearMonthDayWeekdayFormat(this.article.createdAt);
  }

  get authorImage(): string | null {
    return this.author.image;
  }

  get author(): IProfile {
    return (
      Profile.profilesCache[this.article.author.username] || this.article.author
    );
  }
}
</script>
