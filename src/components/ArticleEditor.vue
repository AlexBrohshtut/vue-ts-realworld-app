<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <common-errors-list :errors="errors" />

          <form>
            <fieldset :disabled="isLoading">
              <fieldset class="form-group">
                <input
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  required="true"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  required="true"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  required="true"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  required="true"
                />
                <div class="tag-list">
                  <span
                    v-for="tag in existingTagList"
                    :key="tag"
                    class="tag-default tag-pill ng-binding ng-scope"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publish"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import CommonErrorsList from "@/components/CommonErrorsList.vue";
import { IArticle } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

@Component({
  components: {
    CommonErrorsList
  }
})
export default class ArticleEditor extends Vue {
  @Prop() readonly article: IArticle | undefined;

  isLoading = false;
  title = this.article?.title || "";
  description = this.article?.description || "";
  body = this.article?.body || "";
  tagList = "";
  existingTagList: string[] = this.article?.tagList?.slice() || [];
  errors: string[] = [];

  removeTag(tag: string): void {
    const index = this.existingTagList.indexOf(tag);
    this.existingTagList.splice(index, 1);
  }

  async publish(): Promise<void> {
    this.errors = [];

    this.isLoading = true;
    try {
      let article;
      if (this.article) {
        let newTagsList = this.existingTagList.slice();
        if (this.tagList.length > 0) {
          newTagsList = newTagsList.concat(this.tagList.split(","));
        }
        article = await Article.update({
          slug: this.article.slug,
          params: {
            title: this.title,
            description: this.description,
            body: this.body,
            tagList: newTagsList
          }
        });
      } else {
        article = await Article.create({
          title: this.title,
          body: this.body,
          tagList: this.tagList.split(","),
          description: this.description
        });
      }

      this.$router.push({
        name: this.$routesNames.articleView,
        params: { slug: article.slug }
      });
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
