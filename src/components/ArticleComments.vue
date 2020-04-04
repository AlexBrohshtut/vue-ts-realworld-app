<template>
  <common-loader v-if="isLoading" />
  <div v-else>
    <comment-add :slug="slug" />
    <div class="card">
      <div class="card-block">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
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
          With supporting text below as a natural lead-in to additional content.
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
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import CommentAdd from "@/components/CommentAdd.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import { IComment } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

@Component({ components: { CommonLoader, CommentAdd } })
export default class ArticleComments extends Vue {
  @Prop({ required: true }) slug!: string;

  _comments: IComment[] = [];
  isLoading = false;

  get comments(): IComment[] {
    const comments: IComment[] = [];
    this._comments.forEach(comment => {
      if (Article.commentsCache[this.slug]?.[comment.id]) {
        comments.push(Article.commentsCache[this.slug][comment.id]);
      }
    });
    comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    return comments;
  }

  @Watch("slug")
  async onSlugChange(slug: string): Promise<void> {
    this.isLoading = true;
    try {
      if (slug) {
        await Article.fetchComments(slug);
        this._comments = Object.values(Article.commentsCache[slug]);
      }
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
