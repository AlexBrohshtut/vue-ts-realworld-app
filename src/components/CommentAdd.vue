<template>
  <div>
    <common-errors-list :errors="errors" />
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="body"
          :disabled="isLoading"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          :disabled="isLoading"
          @click="addComment"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import CommonErrorsList from "@/components/CommonErrorsList.vue";
import Article from "@/store/modules/Article";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

@Component({ components: { CommonErrorsList } })
export default class CommentAdd extends Vue {
  @Prop({ required: true }) slug!: string;

  body = "";
  errors: string[] = [];
  isLoading = false;

  get userImage(): string | null | undefined {
    return User.currentUser?.image;
  }

  async addComment(): Promise<void> {
    this.errors = [];

    this.isLoading = true;
    try {
      await Article.addComment({
        slug: this.slug,
        params: { body: this.body }
      });
      this.body = "";
    } catch (e) {
      if (isArrayOfStrings(e)) {
        this.errors = e;
      } else {
        throw e;
      }
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
