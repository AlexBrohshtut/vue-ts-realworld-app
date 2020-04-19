import { computed, Ref, ref, watch } from "@vue/composition-api";
import VueRouter from "vue-router";

import { IRoutesNames } from "@/router";
import { IArticle } from "@/services/realWorldApi/models";
import Article from "@/store/modules/Article";

interface IFetchArticleResult {
  isFetching: Ref<boolean>;
  article: Ref<IArticle>;
}

export default (
  props: { slug: string },
  root: { $router: VueRouter; $routesNames: IRoutesNames }
): IFetchArticleResult => {
  const isFetching = ref(false);
  const article = computed(() => {
    return Article.articlesCache[props.slug];
  });

  const onSlugChange = async (
    toSlug: string,
    fromSlug: string
  ): Promise<void> => {
    isFetching.value = true;
    try {
      if (!toSlug) {
        root.$router.push({ name: root.$routesNames.home });
        return;
      }
      if (toSlug && toSlug !== fromSlug) {
        await Article.fetchSingle(toSlug);
      }
    } catch (e) {
      root.$router.push({ name: root.$routesNames.home });
    } finally {
      isFetching.value = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  watch(() => props.slug, onSlugChange);

  return {
    isFetching,
    article
  };
};
