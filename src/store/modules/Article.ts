import Vue from "vue";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

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
import Profile from "../modules/Profile";
import modulesNames from "../modulesNames";

@Module({ dynamic: true, namespaced: true, store, name: modulesNames.article })
class Article extends VuexModule {
  private _articlesCache: Record<string, IArticle> = {};

  get articlesCache(): Record<string, IArticle> {
    return this._articlesCache;
  }

  @Mutation
  addArticleToCache(article: IArticle): void {
    const cachedArticle = this._articlesCache[article.slug];
    if (!cachedArticle || article.updatedAt >= cachedArticle.updatedAt) {
      Vue.set(this._articlesCache, article.slug, article);
    }
    Profile.addProfileToCache(article.author);
  }

  @Mutation
  clearArticlesCache(): void {
    this._articlesCache = {};
  }

  @Mutation
  removeArticleFromCache(slug: string): void {
    Vue.delete(this._articlesCache, slug);
  }

  @Action({ rawError: true })
  addMultipleArticlesToCache(articles: IArticle[]): void {
    articles.forEach(article => this.addArticleToCache(article));
  }

  @Action({ rawError: true })
  async getSingle(slug: string): Promise<IArticle> {
    const res = await ArticleGet(slug);
    this.addArticleToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async getFeed(
    params: IPagination = { limit: 20, offset: 0 }
  ): Promise<IArticleList> {
    const res = await ArticleGetFeed(params);
    this.clearArticlesCache();
    this.addMultipleArticlesToCache(res.articles);
    return res;
  }

  @Action({ rawError: true })
  async getList(params: IArticleGetListRequestParams): Promise<IArticleList> {
    const res = await ArticleGetList(params);
    this.clearArticlesCache();
    this.addMultipleArticlesToCache(res.articles);
    return res;
  }

  @Action({ rawError: true })
  async create(params: IArticleCreateRequestParams): Promise<IArticle> {
    const res = await ArticleCreate(params);
    this.addArticleToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async update(data: {
    slug: string;
    params: IArticleUpdateRequestParams;
  }): Promise<IArticle> {
    console.log(data);
    const res = await ArticleUpdate(data.slug, data.params);
    this.addArticleToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async delete(slug: string): Promise<IArticle> {
    const res = await ArticleDelete(slug);
    this.removeArticleFromCache(slug);
    return res;
  }

  @Action({ rawError: true })
  async addToFavorites(slug: string): Promise<IArticle> {
    const res = await ArticleAddToFavorites(slug);
    this.addArticleToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async removeFromFavorites(slug: string): Promise<IArticle> {
    const res = await ArticleRemoveFromFavorites(slug);
    this.addArticleToCache(res);
    return res;
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
