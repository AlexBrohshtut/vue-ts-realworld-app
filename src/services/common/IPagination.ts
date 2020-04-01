export const DEFAULT_START_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 20;

export default interface IPagination {
  limit?: number;
  offset?: number;
}
