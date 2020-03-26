import RealWorldApiInstance from "./RealWorldApiBase";
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

const ARTICLES_PATH = "/articles";

export const ArticleGetList = async (
  params: ArticleGetListRequestParams
): Promise<IArticleList> => {
  const res = await RealWorldApiInstance.get(ARTICLES_PATH, { params });
  return res?.data as IArticleList;
};

export const ArticleGetFeed = async (
  params: ArticleGetFeedRequestParams
): Promise<IArticleList> => {
  const res = await RealWorldApiInstance.get(`${ARTICLES_PATH}/feed`, {
    params
  });
  return res?.data as IArticleList;
};

export const ArticleGet = async (slug: string): Promise<IArticle> => {
  const res = await RealWorldApiInstance.get(`${ARTICLES_PATH}/:${slug}`);
  return res?.data?.article as IArticle;
};

export const ArticleCreate = async (
  params: ArticleCreateRequestParams
): Promise<IArticle> => {
  const res = await RealWorldApiInstance.post(ARTICLES_PATH, {
    article: params
  });
  return res?.data?.article as IArticle;
};

export const ArticleUpdate = async (
  slug: string,
  params: ArticleUpdateRequestParams
): Promise<IArticle> => {
  const res = await RealWorldApiInstance.put(`${ARTICLES_PATH}/:${slug}`, {
    article: params
  });
  return res?.data?.article as IArticle;
};

export const ArticleDelete = async (slug: string): Promise<IArticle> => {
  const res = await RealWorldApiInstance.delete(`${ARTICLES_PATH}/:${slug}`);
  return res?.data?.article as IArticle;
};

export const ArticleAddComment = async (
  slug: string,
  params: ArticleAddCommentRequestParams
): Promise<IComment> => {
  const res = await RealWorldApiInstance.post(
    `${ARTICLES_PATH}/:${slug}/comments`,
    {
      comment: params
    }
  );
  return res?.data?.comment as IComment;
};

export const ArticleGetComments = async (slug: string): Promise<IComment[]> => {
  const res = await RealWorldApiInstance.get(
    `${ARTICLES_PATH}/:${slug}/comments`
  );
  return res?.data?.comments as IComment[];
};

export const ArticleDeleteComment = async (
  slug: string,
  commentId: number
): Promise<void> => {
  await RealWorldApiInstance.get(
    `${ARTICLES_PATH}/:${slug}/comments/:${commentId}`
  );
};

export const ArticleAddToFavorites = async (
  slug: string
): Promise<IArticle> => {
  const res = await RealWorldApiInstance.post(
    `${ARTICLES_PATH}/:${slug}/favorite`
  );
  return res?.data?.article as IArticle;
};

export const ArticleRemoveFromFavorites = async (
  slug: string
): Promise<IArticle> => {
  const res = await RealWorldApiInstance.delete(
    `${ARTICLES_PATH}/:${slug}/favorite`
  );
  return res?.data?.article as IArticle;
};
