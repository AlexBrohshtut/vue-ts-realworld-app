<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="{
          name: routesNames.profileIndex,
          params: { username: article.author.username }
        }"
      >
        <img :src="authorImage" />
      </router-link>
      <div class="info">
        <router-link
          :to="{
            name: routesNames.profileIndex,
            params: { username: article.author.username }
          }"
          class="author"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ articleDate }}</span>
      </div>
      <button
        :class="[
          'btn btn-sm pull-xs-right',
          article.favorited ? 'btn-primary' : 'btn-outline-primary'
        ]"
        :disabled="isLoading"
        @click="toggleFavorites"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      :to="{ name: routesNames.articleView, params: { slug: article.slug } }"
      href=""
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>

    <div class="pull-xs-right">
      <span
        v-for="tag in visibleTags"
        :key="tag"
        class="tag-pill tag-default tag-outline"
      >
        {{ tag }}
      </span>
      <span v-if="nonVisibleTagsNumber > 0">
        ... and {{ nonVisibleTagsNumber }} more.
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";

import RoutesNames, { IRoutesNames } from "@/router/routesNames";
import { IArticle } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import DateUtils from "@/utils/DateUtils";

const MAX_VISIBLE_TAGS = 5;

const ArticlePreviewProps = Vue.extend({
  props: {
    article: {
      type: Object as PropType<IArticle>,
      required: true
    }
  }
});

@Component
export default class ArticlePreview extends ArticlePreviewProps {
  isLoading = false;

  routesNames: Readonly<IRoutesNames> = RoutesNames;

  get authorImage(): string {
    return (
      this.article.author.image || process.env.VUE_APP_DEFAULT_AUTHOR_IMAGE
    );
  }

  get articleDate(): string {
    return DateUtils.yearMonthDayWeekdayFormat(this.article.createdAt);
  }

  get visibleTags(): string[] {
    return this.article.tagList.slice(0, MAX_VISIBLE_TAGS);
  }

  get nonVisibleTagsNumber(): number {
    return this.article.tagList.length - MAX_VISIBLE_TAGS;
  }

  async toggleFavorites(): Promise<void> {
    this.isLoading = true;
    try {
      this.article.favorited
        ? await Article.removeFromFavorites(this.article.slug)
        : await Article.addToFavorites(this.article.slug);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
