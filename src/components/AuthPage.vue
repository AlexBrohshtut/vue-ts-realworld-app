<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link
              v-if="isRegisterMode"
              :to="{ name: $routesNames.authLogin }"
            >
              Have an account?
            </router-link>
            <router-link v-else :to="{ name: $routesNames.authRegister }">
              Need an account?
            </router-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>

          <form>
            <fieldset :disabled="isLoading">
              <fieldset v-if="isRegisterMode" class="form-group">
                <input
                  v-model="username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required="true"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  required="true"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required="true"
                />
              </fieldset>
            </fieldset>
            <common-loader
              v-if="isLoading"
              :size="5"
              :margin="0"
              class="pull-xs-right"
            />
            <button
              v-else
              class="btn btn-lg btn-primary pull-xs-right"
              @click="authAction"
            >
              {{ isRegisterMode ? "Sign up" : "Sign in" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import CommonLoader from "@/components/CommonLoader.vue";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

export enum AuthPageMode {
  Register = "Register",
  Login = "Login"
}

@Component({
  components: {
    CommonLoader
  }
})
export default class AuthPage extends Vue {
  @Prop({ required: true }) mode!: AuthPageMode;

  isLoading = false;

  username = "";
  email = "";
  password = "";

  errors?: string[] = [];

  mounted(): void {
    this.errors = [];
  }

  get hasErrors(): boolean {
    return !!this.errors?.length;
  }

  get isRegisterMode(): boolean {
    return this.mode === AuthPageMode.Register;
  }

  async authAction(): Promise<void> {
    this.errors = [];

    this.isLoading = true;
    try {
      this.isRegisterMode
        ? await User.register({
            email: this.email,
            password: this.password,
            username: this.username
          })
        : await User.login({ email: this.email, password: this.password });
      this.$router.push({ name: this.$routesNames.home });
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
