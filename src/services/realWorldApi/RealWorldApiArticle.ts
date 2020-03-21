import RealWorldApiBase from "./RealWorldApiBase";
import {
  ArticleGetFeedRequestParams,
  ArticleGetListRequestParams,
  ArticleCreateRequestParams,
  ArticleUpdateRequestParams,
  ArticleAddCommentRequestParams,
  IArticleList,
  IArticle,
  IComment
} from "./Models";

class RealWorldApiArticle extends RealWorldApiBase {
  async GetList(params: ArticleGetListRequestParams): Promise<IArticleList> {
    const res = await this.client.get("/articles", { params });
    return res?.data as IArticleList;
  }

  async GetFeed(params: ArticleGetFeedRequestParams): Promise<IArticleList> {
    const res = await this.client.get("/articles/feed", { params });
    return res?.data as IArticleList;
  }

  async Get(slug: string): Promise<IArticle> {
    const res = await this.client.get(`/articles/:${slug}`);
    return res?.data?.article as IArticle;
  }

  async Create(params: ArticleCreateRequestParams): Promise<IArticle> {
    const res = await this.client.post("/articles", { article: params });
    return res?.data?.article as IArticle;
  }

  async Update(
    slug: string,
    params: ArticleUpdateRequestParams
  ): Promise<IArticle> {
    const res = await this.client.put(`/articles/:${slug}`, {
      article: params
    });
    return res?.data?.article as IArticle;
  }

  async Delete(slug: string): Promise<IArticle> {
    const res = await this.client.delete(`/articles/:${slug}`);
    return res?.data?.article as IArticle;
  }

  async AddComment(
    slug: string,
    params: ArticleAddCommentRequestParams
  ): Promise<IComment> {
    const res = await this.client.post(`/articles/:${slug}/comments`, {
      comment: params
    });
    return res?.data?.comment as IComment;
  }

  async GetComments(slug: string): Promise<IComment[]> {
    const res = await this.client.get(`/articles/:${slug}/comments`);
    return res?.data?.comments as IComment[];
  }

  async DeleteComment(slug: string, commentId: number): Promise<void> {
    await this.client.get(`/articles/:${slug}/comments/:${commentId}`);
  }

  async AddToFavorites(slug: string): Promise<IArticle> {
    const res = await this.client.post(`/articles/:${slug}/favorite`);
    return res?.data?.article as IArticle;
  }

  async RemoveFromFavorites(slug: string): Promise<IArticle> {
    const res = await this.client.delete(`/articles/:${slug}/favorite`);
    return res?.data?.article as IArticle;
  }
}

export default new RealWorldApiArticle();
