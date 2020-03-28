import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";

import { TagsGet } from "@/services/realWorldApi/RealWorldApiTags";

import store from "../index";
import modulesNames from "../modulesNames";

@Module({ dynamic: true, store, name: modulesNames.tags })
class Tags extends VuexModule {
  @Action
  async get(): Promise<string[]> {
    return await TagsGet();
  }
}

export default getModule(Tags);
