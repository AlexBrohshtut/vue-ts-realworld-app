import { defineComponent } from "@vue/composition-api";

import ArticleEditor from "@/components/ArticleEditor.vue";
import CommonLoader from "@/components/CommonLoader.vue";
import fetchArticle from "@/compositions/fetch-article";

export default defineComponent({
  name: "ArticleEdit",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup: (props, { root }) => {
    const { isFetching, article } = fetchArticle(props, root);
    return () => {
      isFetching.value ? (
        <CommonLoader />
      ) : (
        <ArticleEditor article={article.value} />
      );
    };
  }
});
