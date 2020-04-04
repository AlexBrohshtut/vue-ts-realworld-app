<template>
  <common-loader v-if="isLoading" />
  <article-editor v-else :article="article" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ArticleEditor from "@/components/ArticleEditor.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import { Location } from "@/router";
import { IArticle } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    CommonLoader,
    ArticleEditor
  }
})
export default class ArticleEdit extends Vue {
  isLoading = false;
  article: IArticle | null = null;

  beforeRouteEnter(to: Location, from: Location, next: Function): void {
    next((vm: ArticleEdit) => {
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
      if (toSlug !== fromSlug || !this.article) {
        this.article = await Article.getSingle(toSlug);
      }
    } catch (e) {
      //TODO: Error
      this.$router.push({ name: this.$routesNames.home });
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
