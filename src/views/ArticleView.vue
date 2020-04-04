<template>
  <common-loader v-if="isLoading || !article" />

  <div v-else class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-view-actions
          :article="article"
          @delete-article="onDeleteArticle"
        />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="col-md-12" v-html="HTMLBody"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-view-actions
          :article="article"
          @delete-article="onDeleteArticle"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DOMPurify from "dompurify";
import marked from "marked";
import { Component, Vue } from "vue-property-decorator";

import ArticleViewActions from "@/components/ArticleViewActions.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import { Location } from "@/router";
import { IArticle } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    ArticleViewActions,
    CommonLoader
  }
})
export default class ArticleView extends Vue {
  isLoading = false;
  slug = "";
  _article: IArticle | null = null;

  get article(): IArticle {
    return Article.articlesCache[this.slug] || this._article;
  }

  get HTMLBody(): string {
    const dirtyHtml = marked(this.article.body);
    return DOMPurify.sanitize(dirtyHtml);
  }

  beforeRouteEnter(to: Location, from: Location, next: Function): void {
    next((vm: ArticleView) => {
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
      const toSlug = to?.params?.slug;
      const fromSlug = from?.params?.slug;
      if (!toSlug) {
        this.$router.push({ name: this.$routesNames.home });
        return;
      }
      if (toSlug !== fromSlug) {
        const article = await Article.getSingle(toSlug);
        this.slug = article.slug;
      }
    } catch (e) {
      //TODO: Error
      this.$router.push({ name: this.$routesNames.home });
    } finally {
      this.isLoading = false;
    }
  }

  async onDeleteArticle(): Promise<void> {
    this.isLoading = true;
    try {
      await Article.delete(this.slug);
      this.$router.push({ name: this.$routesNames.home });
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
