import { Action, getModule, Module, VuexModule } from "vuex-module-decorators";

import IPagination from "@/services/common/IPagination";
import {
  IArticle,
  IArticleAddCommentRequestParams,
  IArticleCreateRequestParams,
  IArticleGetListRequestParams,
  IArticleList,
  IArticleUpdateRequestParams,
  IComment
} from "@/services/realWorldApi/models";
import {
  ArticleAddComment,
  ArticleAddToFavorites,
  ArticleCreate,
  ArticleDelete,
  ArticleDeleteComment,
  ArticleGet,
  ArticleGetComments,
  ArticleGetFeed,
  ArticleGetList,
  ArticleRemoveFromFavorites,
  ArticleUpdate
} from "@/services/realWorldApi/RealWorldApiArticle";

import store from "../index";
import modulesNames from "../modulesNames";

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.article })
class Article extends VuexModule {
  @Action({ rawError: true })
  async getSingle(slug: string): Promise<IArticle> {
    debugger;
    return await ArticleGet(slug);
  }

  @Action({ rawError: true })
  async getFeed(
    params: IPagination = { limit: 20, offset: 0 }
  ): Promise<IArticleList> {
    return await ArticleGetFeed(params);
  }

  @Action({ rawError: true })
  async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
    return await ArticleGetList(params);
  }

  @Action({ rawError: true })
  async create(params: IArticleCreateRequestParams): Promise<IArticle> {
    return await ArticleCreate(params);
  }

  @Action({ rawError: true })
  async update(
    slug: string,
    params: IArticleUpdateRequestParams
  ): Promise<IArticle> {
    return await ArticleUpdate(slug, params);
  }

  @Action({ rawError: true })
  async delete(slug: string): Promise<IArticle> {
    return await ArticleDelete(slug);
  }

  @Action({ rawError: true })
  async addToFavorites(slug: string): Promise<IArticle> {
    return await ArticleAddToFavorites(slug);
  }

  @Action({ rawError: true })
  async removeFromFavorites(slug: string): Promise<IArticle> {
    return await ArticleRemoveFromFavorites(slug);
  }

  @Action({ rawError: true })
  async getComments(slug: string): Promise<IComment[]> {
    return await ArticleGetComments(slug);
  }

  @Action({ rawError: true })
  async addComment(
    slug: string,
    params: IArticleAddCommentRequestParams
  ): Promise<IComment> {
    return await ArticleAddComment(slug, params);
  }

  @Action({ rawError: true })
  async deleteComment(slug: string, commentId: number): Promise<void> {
    return await ArticleDeleteComment(slug, commentId);
  }
}

export default getModule(Article);
