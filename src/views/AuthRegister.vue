<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: routesNames.authLogin }">
              Have an account?
            </router-link>
          </p>

          <ul class="error-messages">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>

          <form>
            <fieldset class="form-group">
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
            <common-loader
              v-if="isLoading"
              :size="5"
              :margin="0"
              class="pull-xs-right"
            />
            <button
              v-else
              class="btn btn-lg btn-primary pull-xs-right"
              @click="signUp"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import CommonLoader from "@/components/CommonLoader.vue";
import RoutesNames, { IRoutesNames } from "@/router/routesNames";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

const MIN_USERNAME_LENGTH = 2;

@Component({
  components: {
    CommonLoader
  }
})
export default class AuthRegister extends Vue {
  routesNames: Readonly<IRoutesNames> = RoutesNames;
  isLoading = false;

  username = "";
  email = "";
  password = "";

  errors?: string[] = [];

  get hasErrors(): boolean {
    return !!this.errors?.length;
  }

  async signUp(): Promise<void> {
    this.errors = [];
    const formErrors = this.getFormErrors();
    if (formErrors.length > 0) {
      this.errors = formErrors;
      return;
    }
    this.isLoading = true;
    try {
      await User.register({
        email: this.email,
        password: this.password,
        username: this.username
      });
      this.$router.push({ name: RoutesNames.home });
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

  getFormErrors(): string[] {
    const res = [];

    if (!this.email) {
      res.push("Email is required.");
    }
    if (!this.password) {
      res.push("Password is required.");
    }
    if (!this.username) {
      res.push("Username is required.");
    } else if (this.username.length < MIN_USERNAME_LENGTH) {
      res.push(
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long`
      );
    }

    return res;
  }
}
</script>
