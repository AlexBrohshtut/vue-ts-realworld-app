import IPagination from "@/services/common/IPagination";

export default interface IArticleGetListRequestParams extends IPagination {
  tag?: string;
  author?: string;
  favorited?: string;
}
