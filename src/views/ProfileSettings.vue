<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
          <form>
            <fieldset :disabled="isLoading">
              <fieldset class="form-group">
                <input
                  v-model="image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
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
                <textarea
                  v-model="bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required="true"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New password"
                />
              </fieldset>
              <common-loader v-if="isLoading" :size="5" />
              <button
                v-else
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSettings"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import CommonLoader from "@/components/CommonLoader.vue";
import { ICurrentUser } from "@/store/models";
import User from "@/store/modules/User";
import { isArrayOfStrings } from "@/utils/ArrayUtils";

@Component({
  components: {
    CommonLoader
  }
})
export default class ProfileSettings extends Vue {
  isLoading = false;

  image: string | null = null;
  bio = "";
  email = "";
  password: string | null = null;
  username = "";
  errors?: string[] = [];

  get hasErrors(): boolean {
    return !!this.errors?.length;
  }

  get currentUser(): Partial<ICurrentUser> {
    return User.currentUser || {};
  }

  logout(): void {
    User.logout();
    this.$router.push({ name: this.$routesNames.home });
  }

  async updateSettings(): Promise<void> {
    this.errors = [];

    this.isLoading = true;
    try {
      await User.update({
        email: this.email,
        password: this.password,
        bio: this.bio,
        image: this.image,
        username: this.username
      });
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
  @Watch("currentUser", { immediate: true })
  onCurrentUserLoaded(newValue: ICurrentUser): void {
    this.errors = [];
    if (newValue) {
      this.image = newValue.image;
      this.bio = newValue.bio;
      this.email = newValue.email;
      this.username = newValue.username;
    }
  }
}
</script>
