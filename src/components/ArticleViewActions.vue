<template>
  <article-meta
    :author-username="author.username"
    :created-at="article.createdAt"
    :author-image="author.image"
  >
    <template v-if="!isMyArticle">
      <profile-follow-button
        :username="author.username"
        :following="author.following"
      />
      &nbsp;&nbsp;
      <article-favorites-button
        :favorited="article.favorited"
        :favorites-count="article.favoritesCount"
        :slug="article.slug"
        :is-with-description="true"
      />
    </template>
    <template v-else>
      <router-link
        :to="{
          name: $routesNames.articleEdit,
          params: { slug: article.slug }
        }"
        class="btn btn-outline-secondary btn-sm"
      >
        <i class="ion-edit"></i>
        Edit Article
      </router-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </template>
  </article-meta>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

import ArticleFavoritesButton from "@/components/ArticleFavoritesButton.vue";
import ArticleMeta from "@/components/ArticleMeta.vue";
import ProfileFollowButton from "@/components/ProfileFollowButton.vue";
import { IArticle, IProfile } from "@/services/realWorldApi/models";
import Profile from "@/store/modules/Profile";
import User from "@/store/modules/User";

@Component({
  components: {
    ArticleMeta,
    ArticleFavoritesButton,
    ProfileFollowButton
  }
})
export default class ArticleViewHeader extends Vue {
  @Prop({ required: true }) article!: IArticle;

  get author(): IProfile {
    return (
      Profile.profilesCache[this.article.author.username] || this.article.author
    );
  }

  get isMyArticle(): boolean {
    return (
      this.article.author.username ===
      (User.currentUser && User.currentUser.username)
    );
  }

  @Emit("deleteArticle")
  deleteArticle(): void {
    return;
  }
}
</script>
