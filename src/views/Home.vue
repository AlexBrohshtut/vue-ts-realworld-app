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
                  @click="onMyFeedActivated"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="[
                    'nav-link',
                    { active: activeFeedType === feedTypes.Global }
                  ]"
                  @click="onGlobalFeedActivated"
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
                  @click="onTagFeedActivated(activeTag)"
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
import User from "@/store/modules/User";
import CommonLoader from "@/components/CommonLoader.vue";

enum FeedType {
  Global,
  My,
  Tag
}

@Component({
  components: {
    HomeBanner,
    HomeTags,
    ArticlePreview,
    CommonLoader
  }
})
export default class Home extends Vue {
  feedTypes: typeof FeedType = FeedType;
  isLoading = false;
  activeFeedType: FeedType = FeedType.My;
  activeFeed: IArticleList = { articles: [], articlesCount: 0 };
  activeTag: string | null = null;

  get isLoggedIn(): boolean {
    return User.isLoggedIn;
  }

  async created(): Promise<void> {
    if (this.isLoggedIn) {
      await this.onMyFeedActivated();
    } else {
      await this.onGlobalFeedActivated();
    }
  }

  async onGlobalFeedActivated(): Promise<void> {
    this.isLoading = true;
    try {
      this.activeFeedType = FeedType.Global;
      this.activeFeed = await Article.getList({});
    } finally {
      this.isLoading = false;
    }
  }

  async onMyFeedActivated(): Promise<void> {
    this.isLoading = true;
    try {
      this.activeFeedType = FeedType.My;
      this.activeFeed = await Article.getFeed();
    } finally {
      this.isLoading = false;
    }
  }

  async onTagFeedActivated(tag: string): Promise<void> {
    this.isLoading = true;
    try {
      this.activeFeedType = FeedType.Tag;
      this.activeTag = tag;
      this.activeFeed = await Article.getList({ tag });
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
