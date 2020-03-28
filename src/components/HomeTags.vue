<template>
  <div v-if="isLoading">
    <common-loader :size="7" />
  </div>
  <div v-else class="sidebar">
    <p>Popular Tags</p>

    <div class="tag-list">
      <a
        v-for="tag in tags"
        :key="tag"
        class="tag-pill tag-default"
        href="#"
        @click.prevent="selectTag(tag)"
      >
        {{ tag }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import CommonLoader from "@/components/CommonLoader.vue";
import Tags from "@/store/modules/Tags";

@Component({
  components: { CommonLoader }
})
export default class HomeTags extends Vue {
  tags: string[] = [];
  isLoading = false;

  async mounted(): Promise<void> {
    await this.getTags();
  }

  async getTags(): Promise<void> {
    this.isLoading = true;
    try {
      this.tags = await Tags.get();
    } finally {
      this.isLoading = false;
    }
  }

  selectTag(tag: string): void {
    this.$emit("tag-selected", tag);
  }
}
</script>
