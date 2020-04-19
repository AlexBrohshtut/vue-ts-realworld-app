import { defineComponent } from "@vue/composition-api";

import ArticleEditor from "@/components/ArticleEditor.vue";
export default defineComponent({
  name: "ArticleCreate",
  setup: () => {
    return () => <ArticleEditor />;
  }
});
