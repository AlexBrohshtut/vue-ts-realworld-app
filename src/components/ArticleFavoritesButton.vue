<template>
  <button
    :class="['btn btn-sm', favorited ? 'btn-primary' : 'btn-outline-primary']"
    :disabled="isLoading"
    @click="toggleFavorites"
  >
    <i class="ion-heart"></i>
    &nbsp;
    <template v-if="isWithDescription">
      {{ favorited ? "Unfavorite Article" : "Favorite Article" }}
      <span class="counter">({{ favoritesCount }})</span>
    </template>
    <template v-else>{{ favoritesCount }}</template>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Article from "@/store/modules/Article";

@Component
export default class ArticleFavoritesButton extends Vue {
  @Prop({ required: true }) favoritesCount!: number;
  @Prop({ required: true }) favorited!: boolean;
  @Prop({ required: true }) slug!: string;
  @Prop({ default: false }) isWithDescription!: boolean;

  isLoading = false;

  async toggleFavorites(): Promise<void> {
    this.isLoading = true;
    try {
      this.favorited
        ? await Article.removeFromFavorites(this.slug)
        : await Article.addToFavorites(this.slug);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
