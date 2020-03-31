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
      v-for="article in feed.articles"
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
import Vue, { PropType } from "vue";
import Component from "vue-class-component";

import ArticlePreview from "@/components/ArticlePreview.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import CommonPagination from "@/components/CommonPagination.vue";
import { IArticleList } from "@/services/realWorldApi/models";

export interface IFeedTab {
  id: string;
  title: string;
}

const CommonFeedProps = Vue.extend({
  props: {
    tabs: {
      type: Array as PropType<IFeedTab[]>,
      required: true
    },
    activeTabId: {
      type: String,
      default: ""
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    feed: {
      type: Object as PropType<IArticleList>,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
});

@Component({
  components: {
    CommonLoader,
    ArticlePreview,
    CommonPagination
  }
})
export default class CommonFeed extends CommonFeedProps {
  onTabChanged(tabId: string): void {
    this.$emit("tab-changed", tabId);
  }
  onPageChanged(page: number): void {
    this.$emit("page-changed", page);
  }
}
</script>
