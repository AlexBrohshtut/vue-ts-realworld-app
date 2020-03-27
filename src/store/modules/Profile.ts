import { Module, VuexModule, getModule, Action } from "vuex-module-decorators";
import store from "../index";
import modulesNames from "../modulesNames";
import {
  ProfileFollow,
  ProfileGet,
  ProfileUnfollow
} from "@/services/realWorldApi/RealWorldApiProfile";
import { IProfile } from "@/services/realWorldApi/models";

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
