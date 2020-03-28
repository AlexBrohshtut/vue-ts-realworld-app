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

@Module({ dynamic: true, store, name: modulesNames.article })
class Article extends VuexModule {
  @Action
  async getSingle(slug: string): Promise<IArticle> {
    debugger;
    return await ArticleGet(slug);
  }

  @Action
  async getFeed(
    params: IPagination = { limit: 20, offset: 0 }
  ): Promise<IArticleList> {
    return await ArticleGetFeed(params);
  }

  @Action
  async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
    return await ArticleGetList(params);
  }

  @Action
  async create(params: IArticleCreateRequestParams): Promise<IArticle> {
    return await ArticleCreate(params);
  }

  @Action
  async update(
    slug: string,
    params: IArticleUpdateRequestParams
  ): Promise<IArticle> {
    return await ArticleUpdate(slug, params);
  }

  @Action
  async delete(slug: string): Promise<IArticle> {
    return await ArticleDelete(slug);
  }

  @Action
  async addToFavorites(slug: string): Promise<IArticle> {
    return await ArticleAddToFavorites(slug);
  }

  @Action
  async removeFromFavorites(slug: string): Promise<IArticle> {
    return await ArticleRemoveFromFavorites(slug);
  }

  @Action
  async getComments(slug: string): Promise<IComment[]> {
    return await ArticleGetComments(slug);
  }

  @Action
  async addComment(
    slug: string,
    params: IArticleAddCommentRequestParams
  ): Promise<IComment> {
    return await ArticleAddComment(slug, params);
  }

  @Action
  async deleteComment(slug: string, commentId: number): Promise<void> {
    return await ArticleDeleteComment(slug, commentId);
  }
}

export default getModule(Article);
