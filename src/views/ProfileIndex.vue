<template>
  <common-loader v-if="isLoading" />
  <div v-else class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              :class="[
                'btn btn-sm action-btn',
                profile.following ? 'btn-secondary' : 'btn-outline-secondary'
              ]"
            >
              <i
                :class="[
                  profile.following ? 'ion-minus-round' : 'ion-plus-round'
                ]"
              ></i>
              {{ followButtonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import CommonFeed, { IFeedTab } from "@/components/CommonFeed.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import IPagination, {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_START_PAGE
} from "@/services/common/IPagination";
import {
  IArticle,
  IArticleList,
  IProfile
} from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import Profile from "@/store/modules/Profile";

enum FeedType {
  Favorited = "Favorited",
  My = "My"
}

@Component({
  components: {
    CommonLoader,
    CommonFeed
  }
})
export default class ProfileIndex extends Vue {
  profile: Partial<IProfile> = {};
  isLoading = false;
  currentPage = DEFAULT_START_PAGE;
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE;

  activeTabId: FeedType = FeedType.My;
  activeFeed: IArticleList = { articles: [], articlesCount: 0 };
  activeTag: string | null = null;

  tabs: IFeedTab[] = [
    {
      id: FeedType.My,
      title: "My Articles"
    },
    {
      id: FeedType.Favorited,
      title: "Favorited Articles"
    }
  ];

  get followButtonTitle(): string {
    return this.profile.following
      ? `Unfollow ${this.profile.username}`
      : `Follow ${this.profile.username}`;
  }

  get articlesCache(): Record<string, IArticle> {
    return Article.articlesCache;
  }

  get articles(): IArticle[] {
    return this.activeFeed.articles.map(
      article => this.articlesCache[article.slug]
    );
  }

  get currentProfileUsername(): string {
    return this.$route.params.username;
  }

  @Watch("currentProfileUsername", { immediate: true })
  async onCurrentProfileUsernameChanged(newValue: string): Promise<void> {
    this.isLoading = true;
    try {
      this.profile = await Profile.get(newValue);
      await this.fetchFeed();
    } finally {
      this.isLoading = false;
    }
  }

  async onTabChanged(tabId: FeedType): Promise<void> {
    switch (tabId) {
      case FeedType.My:
      case FeedType.Favorited:
        this.activeTabId = tabId;
        this.currentPage = DEFAULT_START_PAGE;
        await this.fetchFeed();
        break;

      default:
        throw new Error(`Unexpected tabId: ${tabId}`);
    }
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
        case FeedType.Favorited:
          this.activeFeed = await Article.getList({
            favorited: this.profile.username,
            ...pagination
          });
          break;
        case FeedType.My:
          this.activeFeed = await Article.getList({
            author: this.profile.username,
            ...pagination
          });
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
