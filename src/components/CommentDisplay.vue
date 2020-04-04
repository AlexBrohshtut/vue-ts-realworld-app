<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <router-link
        :to="{
          name: $routesNames.profileIndex,
          params: { username: comment.author.username }
        }"
        class="comment-author"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ commentDate }}</span>
      <span class="mod-options">
        <i class="ion-trash-a" :disabled="isLoading" @click="deleteComment"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IComment } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import User from "@/store/modules/User";
import DateUtils from "@/utils/DateUtils";

@Component
export default class CommentDisplay extends Vue {
  @Prop({ required: true }) comment!: IComment;
  @Prop({ required: true }) slug!: string;

  isLoading = false;

  get commentDate(): string {
    return DateUtils.yearMonthDayWeekdayFormat(this.comment.createdAt);
  }

  get isMyComment(): boolean {
    return User.currentUser?.username === this.comment.author.username;
  }

  async deleteComment(): Promise<void> {
    this.isLoading = true;
    try {
      await Article.deleteComment({
        slug: this.slug,
        commentId: this.comment.id
      });
      debugger;
      this.$emit("comment-deleted");
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
