<template>
  <div>
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <li v-for="tab in tabs" :key="tab.id" class="nav-item">
          <a
            :class="['nav-link', { active: activeTabId === tab.id }]"
            href="#"
            @click.prevent="onTabChanged(tab.id)"
          >
            {{ tab.title }}
          </a>
        </li>
      </ul>
    </div>

    <common-loader v-if="isLoading" />

    <article-preview
      v-for="article in articles"
      v-else
      :key="article.slug"
      :article="article"
    />

    <div v-if="feed.articlesCount === 0 && !isLoading" class="article-preview">
      No articles are here... yet.
    </div>

    <common-pagination
      v-show="!isLoading"
      :total-items="feed.articlesCount"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-changed="onPageChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

import ArticlePreview from "@/components/ArticlePreview.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import CommonPagination from "@/components/CommonPagination.vue";
import { IArticle, IArticleList } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

export interface IFeedTab {
  id: string;
  title: string;
}

@Component({
  components: {
    CommonLoader,
    ArticlePreview,
    CommonPagination
  }
})
export default class CommonFeed extends Vue {
  @Prop({ required: true }) tabs!: IFeedTab[];
  @Prop({ default: "" }) activeTabId!: string;
  @Prop({ default: false }) isLoading!: boolean;
  @Prop({ required: true }) feed!: IArticleList;
  @Prop({ required: true }) itemsPerPage!: number;
  @Prop({ required: true }) currentPage!: number;

  get articlesCache(): Record<string, IArticle> {
    return Article.articlesCache;
  }

  get articles(): IArticle[] {
    return this.feed.articles.map(article => this.articlesCache[article.slug]);
  }

  @Emit("tab-changed")
  onTabChanged(tabId: string): string {
    return tabId;
  }
  @Emit("page-changed")
  onPageChanged(page: number): number {
    return page;
  }
}
</script>
