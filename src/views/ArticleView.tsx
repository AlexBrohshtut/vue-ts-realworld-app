import { computed, defineComponent, ref } from "@vue/composition-api";
import DOMPurify from "dompurify";
import marked from "marked";

import ArticleComments from "@/components/ArticleComments.vue";
import ArticleViewActions from "@/components/ArticleViewActions.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import fetchArticle from "@/compositions/fetch-article";
import Article from "@/store/modules/Article";

export default defineComponent({
  name: "ArticleView",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup: ({ slug }, { root: { $router, $routesNames } }) => {
    const isLoading = ref(false);
    const { isFetching, article } = fetchArticle(
      { slug },
      {
        $router,
        $routesNames
      }
    );

    const HTMLBody = computed(() => {
      const dirtyHtml = marked(article.value.body || "");
      return DOMPurify.sanitize(dirtyHtml);
    });

    const onDeleteArticle = async (): Promise<void> => {
      isLoading.value = true;
      try {
        await Article.delete(slug);
        $router.push({ name: $routesNames.home });
      } finally {
        isLoading.value = false;
      }
    };
    return () =>
      isLoading.value || isFetching.value ? (
        <CommonLoader />
      ) : (
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>{article.value.title}</h1>
              <ArticleViewActions
                article={article.value}
                onDeleteArticle={onDeleteArticle}
              />
            </div>
          </div>
          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12" domPropsInnerHTML={HTMLBody.value}></div>
            </div>

            <hr />

            <div class="article-actions">
              <ArticleViewActions
                article={article.value}
                onDeleteArticle={onDeleteArticle}
              />
            </div>

            <div class="row">
              <ArticleComments
                class="col-xs-12 col-md-8 offset-md-2"
                slug={slug}
              />
            </div>
          </div>
        </div>
      );
  }
});
