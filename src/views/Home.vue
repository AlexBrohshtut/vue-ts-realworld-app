<template>
  <div class="home-page">
    <home-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <common-feed
            :tabs="tabs"
            :active-tab-id="activeTabId"
            :is-loading="isLoading"
            :feed="activeFeed"
            :items-per-page="itemsPerPage"
            :current-page="currentPage"
            @page-changed="onPageChanged"
            @tab-changed="onTabChanged"
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

import CommonFeed, { IFeedTab } from "@/components/CommonFeed.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HomeTags from "@/components/HomeTags.vue";
import IPagination, {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_START_PAGE
} from "@/services/common/IPagination";
import { IArticle, IArticleList } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import User from "@/store/modules/User";

enum FeedType {
  Global = "Global",
  My = "My",
  Tag = "Tag"
}

@Component({
  components: {
    HomeBanner,
    HomeTags,
    CommonFeed
  }
})
export default class Home extends Vue {
  feedTypes: typeof FeedType = FeedType;
  isLoading = false;
  currentPage = DEFAULT_START_PAGE;
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE;

  activeTabId: FeedType = FeedType.My;
  activeFeed: IArticleList = { articles: [], articlesCount: 0 };
  activeTag: string | null = null;

  get isLoggedIn(): boolean {
    return User.isLoggedIn;
  }

  get articlesCache(): Record<string, IArticle> {
    return Article.articlesCache;
  }

  get articles(): IArticle[] {
    return this.activeFeed.articles.map(
      article => this.articlesCache[article.slug]
    );
  }

  get tabs(): IFeedTab[] {
    const res: IFeedTab[] = [];

    if (this.isLoggedIn) {
      res.push({
        id: FeedType.My,
        title: "Your Feed"
      });
    }

    res.push({
      id: FeedType.Global,
      title: "Global Feed"
    });

    if (this.activeTag && this.activeTabId === FeedType.Tag) {
      res.push({
        id: FeedType.Tag,
        title: `#${this.activeTag}`
      });
    }
    return res;
  }

  async created(): Promise<void> {
    this.activeTabId = this.isLoggedIn ? FeedType.My : FeedType.Global;
    await this.fetchFeed();
  }

  async onTabChanged(tabId: FeedType): Promise<void> {
    switch (tabId) {
      case FeedType.My:
      case FeedType.Global:
        this.activeTabId = tabId;
        this.currentPage = DEFAULT_START_PAGE;
        await this.fetchFeed();
        break;
      case FeedType.Tag:
        await this.onTagFeedActivated(this.activeTag || "");
        break;

      default:
        throw new Error(`Unexpected tabId: ${tabId}`);
    }
  }

  async onTagFeedActivated(tag: string): Promise<void> {
    this.activeTabId = FeedType.Tag;
    this.currentPage = DEFAULT_START_PAGE;
    this.activeTag = tag;
    await this.fetchFeed();
  }

  async onPageChanged(page: number): Promise<void> {
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

      switch (this.activeTabId) {
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
