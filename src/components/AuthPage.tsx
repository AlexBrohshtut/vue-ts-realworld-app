import {
  computed,
  defineComponent,
  PropType,
  reactive
} from "@vue/composition-api";

import CommonErrorsList from "@/components/CommonErrorsList.vue";
import CommonInputField from "@/components/CommonInputField";
import CommonLoader from "@/components/CommonLoader.vue";
import UseLogin from "@/compositions/login";
import UseRegister from "@/compositions/register";

export enum AuthPageMode {
  Register = "Register",
  Login = "Login"
}

export default defineComponent({
  name: "AuthPage",
  props: {
    mode: {
      type: String as PropType<AuthPageMode>,
      required: true
    }
  },
  setup: ({ mode }, { root: { $router, $routesNames } }) => {
    const isRegisterMode = computed(() => {
      return mode === AuthPageMode.Register;
    });
    const { errors, isLoading, authAction } = isRegisterMode.value
      ? UseRegister({
          $router,
          $routesNames
        })
      : UseLogin({ $router, $routesNames });

    const form = reactive({
      username: "",
      email: "",
      password: ""
    });

    return () => (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                {isRegisterMode ? (
                  <router-link to={{ name: $routesNames.authLogin }}>
                    Have an account?
                  </router-link>
                ) : (
                  <router-link to={{ name: $routesNames.authRegister }}>
                    Need an account?
                  </router-link>
                )}
              </p>

              <CommonErrorsList errors={errors.value} />

              <form>
                <fieldset disabled={isLoading.value}>
                  {isRegisterMode.value && (
                    <CommonInputField
                      type="text"
                      value={form.username}
                      onInput={(value: string) => (form.username = value)}
                      placeholder="Your name"
                      required={true}
                    />
                  )}
                  <CommonInputField
                    type="email"
                    value={form.email}
                    onInput={(value: string) => (form.email = value)}
                    placeholder="Email"
                    required={true}
                  />
                  <CommonInputField
                    type="password"
                    value={form.password}
                    onInput={(value: string) => (form.password = value)}
                    placeholder="Password"
                    required={true}
                  />
                </fieldset>
                {isLoading.value ? (
                  <CommonLoader size={5} margin={0} class="pull-xs-right" />
                ) : (
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    onClick={() => authAction(form)}
                  >
                    {isRegisterMode ? "Sign up" : "Sign in"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
