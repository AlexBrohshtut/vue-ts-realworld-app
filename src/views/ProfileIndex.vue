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

            <router-link
              v-if="isMyProfile"
              :to="{ name: $routesNames.profileSettings }"
              class="btn action-btn btn-sm btn-outline-secondary"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </router-link>
            <button
              v-else
              :class="[
                'btn btn-sm action-btn',
                profile.following ? 'btn-secondary' : 'btn-outline-secondary'
              ]"
              :disabled="isFollowActionInProgress"
              @click="onFollowButtonClick"
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
import { Component, Vue } from "vue-property-decorator";

import CommonFeed, { IFeedTab } from "@/components/CommonFeed.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import { Location } from "@/router";
import IPagination, {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_START_PAGE
} from "@/services/common/IPagination";
import { IArticleList, IProfile } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import Profile from "@/store/modules/Profile";
import User from "@/store/modules/User";

enum FeedType {
  Favorites = "favorites",
  My = "my"
}

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    CommonLoader,
    CommonFeed
  }
})
export default class ProfileIndex extends Vue {
  profile: IProfile = { username: "", bio: "", image: "", following: false };
  isLoading = false;
  isFollowActionInProgress = false;
  currentPage = DEFAULT_START_PAGE;
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE;

  activeTabId: FeedType = FeedType.My;
  activeFeed: IArticleList = { articles: [], articlesCount: 0 };
  activeTag: string | null = null;

  get tabs(): IFeedTab[] {
    const myTitle = this.isMyProfile
      ? "My Articles"
      : `${this.profile.username}'s Articles`;
    return [
      {
        id: FeedType.My,
        title: myTitle
      },
      {
        id: FeedType.Favorites,
        title: "Favorited Articles"
      }
    ];
  }

  get isMyProfile(): boolean {
    return this.profile.username === User.currentUser?.username;
  }

  get followButtonTitle(): string {
    return this.profile.following
      ? `Unfollow ${this.profile.username}`
      : `Follow ${this.profile.username}`;
  }

  beforeRouteEnter(to: Location, from: Location, next: Function): void {
    next((vm: ProfileIndex) => {
      vm.onRouteUpdate(to, from, next);
    });
  }
  beforeRouteUpdate(to: Location, from: Location, next: Function): void {
    this.onRouteUpdate(to, from, next);
  }

  async onRouteUpdate(
    to: Location,
    from: Location,
    next: Function
  ): Promise<void> {
    next();

    this.isLoading = true;
    try {
      const toUserName = to?.params?.username;
      const fromUserName = from?.params?.username;
      if (!toUserName) {
        this.$router.push({ name: this.$routesNames.home });
        return;
      }
      if (toUserName !== fromUserName) {
        this.profile = await Profile.get(toUserName);
      }

      const tabId = to?.params?.tabId;
      if (tabId && Object.values(FeedType).some(v => (v as string) === tabId)) {
        this.activeTabId = tabId as FeedType;
      } else {
        this.activeTabId = FeedType.My;
      }

      await this.fetchFeed();
    } catch (e) {
      //TODO: Error
      this.$router.push({ name: this.$routesNames.home });
    } finally {
      this.isLoading = false;
    }
  }

  async onTabChanged(tabId: FeedType): Promise<void> {
    switch (tabId) {
      case FeedType.My:
      case FeedType.Favorites:
        this.activeTabId = tabId;
        this.currentPage = DEFAULT_START_PAGE;
        this.$router.push({
          params: { username: this.profile.username, tabId: this.activeTabId }
        });
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

  async onFollowButtonClick(): Promise<void> {
    this.isFollowActionInProgress = true;
    try {
      this.profile = this.profile.following
        ? await Profile.unFollow(this.profile.username)
        : await Profile.follow(this.profile.username);
    } finally {
      this.isFollowActionInProgress = false;
    }
  }

  async fetchFeed(): Promise<void> {
    this.isLoading = true;
    try {
      const pagination: IPagination = {
        limit: this.itemsPerPage,
        offset: (this.currentPage - 1) * this.itemsPerPage
      };

      switch (this.activeTabId) {
        case FeedType.Favorites:
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
