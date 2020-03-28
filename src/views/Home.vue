<template>
  <div class="home-page">
    <home-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isLoggedIn" class="nav-item">
                <a
                  :class="[
                    'nav-link',
                    { active: activeFeedType === feedTypes.My }
                  ]"
                  href="#"
                  @click.prevent="onMyFeedActivated"
                >
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a
                  :class="[
                    'nav-link',
                    { active: activeFeedType === feedTypes.Global }
                  ]"
                  href="#"
                  @click.prevent="onGlobalFeedActivated"
                >
                  Global Feed
                </a>
              </li>
              <li v-if="activeFeedType === feedTypes.Tag" class="nav-item">
                <a
                  :class="[
                    'nav-link',
                    { active: activeFeedType === feedTypes.Tag }
                  ]"
                  href="#"
                  @click.prevent="onTagFeedActivated(activeTag)"
                >
                  #{{ activeTag }}
                </a>
              </li>
            </ul>
          </div>

          <common-loader v-if="isLoading" />

          <article-preview
            v-for="article in activeFeed.articles"
            v-else
            :key="article.slug"
            :article="article"
          />

          <common-pagination
            :total-items="activeFeed.articlesCount"
            :items-per-page="itemsPerPage"
            :current-page="currentPage"
            @page-selected="onPageSelected"
          />
        </div>

        <div class="col-md-3">
          <home-tags @tag-selected="onTagFeedActivated" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeTags from "@/components/HomeTags.vue";
import ArticlePreview from "@/components/ArticlePreview.vue";
import Article from "@/store/modules/Article";
import { IArticleList } from "@/services/realWorldApi/models";
import IPagination from "@/services/common/IPagination";
import User from "@/store/modules/User";
import CommonLoader from "@/components/CommonLoader.vue";
import CommonPagination from "@/components/CommonPagination.vue";

enum FeedType {
  Global,
  My,
  Tag
}

const DEFAULT_START_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 20;

@Component({
  components: {
    HomeBanner,
    HomeTags,
    ArticlePreview,
    CommonLoader,
    CommonPagination
  }
})
export default class Home extends Vue {
  feedTypes: typeof FeedType = FeedType;
  isLoading = false;
  currentPage = DEFAULT_START_PAGE;
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE;

  activeFeedType: FeedType = FeedType.My;
  activeFeed: IArticleList = { articles: [], articlesCount: 0 };
  activeTag: string | null = null;

  get isLoggedIn(): boolean {
    return User.isLoggedIn;
  }

  async created(): Promise<void> {
    this.activeFeedType = this.isLoggedIn ? FeedType.My : FeedType.Global;
    await this.fetchFeed();
  }

  async onGlobalFeedActivated(): Promise<void> {
    this.activeFeedType = FeedType.Global;
    this.currentPage = DEFAULT_START_PAGE;
    await this.fetchFeed();
  }

  async onMyFeedActivated(): Promise<void> {
    this.activeFeedType = FeedType.My;
    this.currentPage = DEFAULT_START_PAGE;
    await this.fetchFeed();
  }

  async onTagFeedActivated(tag: string): Promise<void> {
    this.activeFeedType = FeedType.Tag;
    this.currentPage = DEFAULT_START_PAGE;
    this.activeTag = tag;
    await this.fetchFeed();
  }

  async onPageSelected(page: number): Promise<void> {
    this.currentPage = page;
    await this.fetchFeed();
  }

  async fetchFeed(): Promise<void> {
    this.isLoading = true;
    try {
      const pagination: IPagination = {
        limit: this.itemsPerPage,
        offset: (this.currentPage - 1) * this.itemsPerPage
      };

      switch (this.activeFeedType) {
        case FeedType.Global:
          this.activeFeed = await Article.getList({ ...pagination });
          break;
        case FeedType.Tag:
          this.activeFeed = await Article.getList({
            tag: this.activeTag as string,
            ...pagination
          });
          break;
        case FeedType.My:
          this.activeFeed = await Article.getFeed(pagination);
          break;
        default:
          break;
      }
    } finally {
      this.isLoading = false;
      window.scrollTo(0, 0);
    }
  }
}
</script>
