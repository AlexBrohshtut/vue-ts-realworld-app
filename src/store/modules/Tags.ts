import { Module, VuexModule, getModule, Action } from "vuex-module-decorators";
import store from "../index";
import modulesNames from "../modulesNames";
import { TagsGet } from "@/services/realWorldApi/RealWorldApiTags";

@Module({ dynamic: true, store, name: modulesNames.tags })
class Tags extends VuexModule {
  @Action
  async get(): Promise<string[]> {
    return await TagsGet();
  }
}

export default getModule(Tags);
