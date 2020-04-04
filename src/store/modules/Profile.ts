import Vue from "vue";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import { IProfile } from "@/services/realWorldApi/models";
import {
  ProfileFollow,
  ProfileGet,
  ProfileUnfollow
} from "@/services/realWorldApi/RealWorldApiProfile";

import store from "../index";
import modulesNames from "../modulesNames";

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.profile })
class Profile extends VuexModule {
  private _profilesCache: Record<string, IProfile> = {};

  get profilesCache(): Record<string, IProfile> {
    return this._profilesCache;
  }

  @Mutation
  addProfileToCache(profile: IProfile): void {
    Vue.set(this._profilesCache, profile.username, profile);
  }

  @Action({ rawError: true })
  async get(username: string): Promise<IProfile> {
    const res = await ProfileGet(username);
    this.addProfileToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async follow(username: string): Promise<IProfile> {
    const res = await ProfileFollow(username);
    this.addProfileToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async unFollow(username: string): Promise<IProfile> {
    const res = await ProfileUnfollow(username);
    this.addProfileToCache(res);
    return res;
  }
}

export default getModule(Profile);
