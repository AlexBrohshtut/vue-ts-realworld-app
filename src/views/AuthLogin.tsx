import { defineComponent } from "@vue/composition-api";

import AuthPage, { AuthPageMode } from "@/components/AuthPage";

export default defineComponent({
  name: "ArticleLogin",
  setup: () => {
    return () => <AuthPage mode={AuthPageMode.Login} />;
  }
});
