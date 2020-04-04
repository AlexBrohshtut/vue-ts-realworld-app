<template>
  <common-loader v-if="isLoading" />
  <div v-else>
    <comment-add :slug="slug" />
    <comment-display
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :slug="slug"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import CommentAdd from "@/components/CommentAdd.vue";
import CommentDisplay from "@/components/CommentDisplay.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import { IComment } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

@Component({ components: { CommonLoader, CommentAdd, CommentDisplay } })
export default class ArticleComments extends Vue {
  @Prop({ required: true }) slug!: string;

  _comments: IComment[] = [];
  isLoading = false;

  get comments(): IComment[] {
    const comments: IComment[] = [];
    this._comments?.forEach(comment => {
      if (Article.commentsCache[this.slug]?.[comment.id]) {
        comments.push(Article.commentsCache[this.slug][comment.id]);
      }
    });
    comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    return comments;
  }

  @Watch("slug", { immediate: true })
  async onSlugChange(slug: string): Promise<void> {
    this.isLoading = true;
    try {
      if (slug) {
        await Article.fetchComments(slug);
        this._comments = Object.values(Article.commentsCache[slug] || []);
      }
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
