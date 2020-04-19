import { defineComponent } from "@vue/composition-api";

import AuthPage, { AuthPageMode } from "@/components/AuthPage";

export default defineComponent({
  name: "ArticleRegister",
  setup: () => {
    return () => <AuthPage mode={AuthPageMode.Register} />;
  }
});
