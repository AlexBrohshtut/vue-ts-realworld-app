import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";

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
  @Action({ rawError: true })
  async get(username: string): Promise<IProfile> {
    return await ProfileGet(username);
  }

  @Action({ rawError: true })
  async follow(username: string): Promise<IProfile> {
    return await ProfileFollow(username);
  }

  @Action({ rawError: true })
  async unFollow(username: string): Promise<IProfile> {
    return await ProfileUnfollow(username);
  }
}

export default getModule(Profile);
