import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";

import { IProfile } from "@/services/realWorldApi/models";
import {
  ProfileFollow,
  ProfileGet,
  ProfileUnfollow
} from "@/services/realWorldApi/RealWorldApiProfile";

import store from "../index";
import modulesNames from "../modulesNames";

@Module({ dynamic: true, store, name: modulesNames.profile })
class Profile extends VuexModule {
  @Action
  async get(username: string): Promise<IProfile> {
    return await ProfileGet(username);
  }

  @Action
  async follow(username: string): Promise<IProfile> {
    return await ProfileFollow(username);
  }

  @Action
  async unFollow(username: string): Promise<IProfile> {
    return await ProfileUnfollow(username);
  }
}

export default getModule(Profile);
