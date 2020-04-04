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
  private _commentsCache: Record<string, Record<number, IComment>> = {};

  get articlesCache(): Record<string, IArticle> {
    return this._articlesCache;
  }

  get commentsCache(): Record<string, Record<number, IComment>> {
    return this._commentsCache;
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

  @Mutation
  addCommentToCache(payload: { slug: string; comment: IComment }): void {
    if (!this._commentsCache[payload.slug]) {
      Vue.set(this._commentsCache, payload.slug, {});
    }
    Vue.set(
      this._commentsCache[payload.slug],
      payload.comment.id,
      payload.comment
    );
    Profile.addProfileToCache(payload.comment.author);
  }

  @Mutation
  clearCommentsCache(): void {
    this._commentsCache = {};
  }

  @Mutation
  removeCommentFromCache(payload: { slug: string; id: number }): void {
    Vue.delete(this._commentsCache[payload.slug], payload.id);
  }

  @Action({ rawError: true })
  addMultipleCommentsToCache(payload: {
    slug: string;
    comments: IComment[];
  }): void {
    payload.comments.forEach(comment =>
      this.addCommentToCache({ slug: payload.slug, comment })
    );
  }

  @Action({ rawError: true })
  addMultipleArticlesToCache(articles: IArticle[]): void {
    articles.forEach(article => this.addArticleToCache(article));
  }

  @Action({ rawError: true })
  async fetchSingle(slug: string): Promise<void> {
    const res = await ArticleGet(slug);
    this.addArticleToCache(res);
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
  async update(payload: {
    slug: string;
    params: IArticleUpdateRequestParams;
  }): Promise<IArticle> {
    const res = await ArticleUpdate(payload.slug, payload.params);
    this.addArticleToCache(res);
    return res;
  }

  @Action({ rawError: true })
  async delete(slug: string): Promise<void> {
    await ArticleDelete(slug);
    this.removeArticleFromCache(slug);
  }

  @Action({ rawError: true })
  async addToFavorites(slug: string): Promise<void> {
    const res = await ArticleAddToFavorites(slug);
    this.addArticleToCache(res);
  }

  @Action({ rawError: true })
  async removeFromFavorites(slug: string): Promise<void> {
    const res = await ArticleRemoveFromFavorites(slug);
    this.addArticleToCache(res);
  }

  @Action({ rawError: true })
  async fetchComments(slug: string): Promise<void> {
    const comments = await ArticleGetComments(slug);
    this.addMultipleCommentsToCache({ slug, comments });
  }

  @Action({ rawError: true })
  async addComment(payload: {
    slug: string;
    params: IArticleAddCommentRequestParams;
  }): Promise<void> {
    const comment = await ArticleAddComment(payload.slug, payload.params);
    this.addCommentToCache({ slug: payload.slug, comment });
  }

  @Action({ rawError: true })
  async deleteComment(payload: {
    slug: string;
    commentId: number;
  }): Promise<void> {
    await ArticleDeleteComment(payload.slug, payload.commentId);
    this.removeCommentFromCache({ slug: payload.slug, id: payload.commentId });
  }
}

export default getModule(Article);
