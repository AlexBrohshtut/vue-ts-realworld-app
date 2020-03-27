import { Module, VuexModule, getModule, Action } from "vuex-module-decorators";
import store from "../index";
import modulesNames from "../modulesNames";
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
import {
  IArticle,
  IComment,
  IArticleAddCommentRequestParams,
  IArticleCreateRequestParams,
  IArticleGetFeedRequestParams,
  IArticleGetListRequestParams,
  IArticleList,
  IArticleUpdateRequestParams
} from "@/services/realWorldApi/models";

@Module({ dynamic: true, store, name: modulesNames.article })
class Article extends VuexModule {
  @Action
  async get(slug: string): Promise<IArticle> {
    return await ArticleGet(slug);
  }

  @Action
  async getFeed(params: IArticleGetFeedRequestParams): Promise<IArticleList> {
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
