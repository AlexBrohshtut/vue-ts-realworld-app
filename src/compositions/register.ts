import { Ref, ref } from "@vue/composition-api";
import VueRouter from "vue-router";

import { IRoutesNames } from "@/router";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

export interface IUseRegisterResult {
  errors: Ref<string[]>;
  authAction: (form: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  isLoading: Ref<boolean>;
}

export default (root: {
  $router: VueRouter;
  $routesNames: IRoutesNames;
}): IUseRegisterResult => {
  const errors = ref([] as string[]);
  const isLoading = ref(false);

  const register = async (form: {
    email: string;
    password: string;
    username: string;
  }): Promise<void> => {
    errors.value = [];
    isLoading.value = true;
    try {
      await User.register({
        email: form.email,
        password: form.password,
        username: form.username
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
    authAction: register,
    isLoading
  };
};
