import { Ref, ref } from "@vue/composition-api";
import VueRouter from "vue-router";

import { IRoutesNames } from "@/router";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

export interface IUseLoginResult {
  errors: Ref<string[]>;
  authAction: (form: { email: string; password: string }) => Promise<void>;
  isLoading: Ref<boolean>;
}

export default (root: {
  $router: VueRouter;
  $routesNames: IRoutesNames;
}): IUseLoginResult => {
  const errors = ref([] as string[]);
  const isLoading = ref(false);

  const login = async (form: {
    email: string;
    password: string;
  }): Promise<void> => {
    errors.value = [];
    isLoading.value = true;
    try {
      await User.login({
        email: form.email,
        password: form.password
      });
      await root.$router.push({ name: root.$routesNames.home });
    } catch (e) {
      if (isArrayOfStrings(e)) {
        errors.value = e;
      } else {
        throw e;
      }
    } finally {
      isLoading.value = false;
    }
  };
  return {
    errors,
    authAction: login,
    isLoading
  };
};
