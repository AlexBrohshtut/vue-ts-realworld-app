export default interface IArticleCreateRequestParams {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
