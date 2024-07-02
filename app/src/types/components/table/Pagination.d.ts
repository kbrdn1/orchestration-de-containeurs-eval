type Pagination<T> = {
  items: T[];
  meta: Metadata;
};

type Metadata = {
  total: number;
  pagesCount: number;
  currentPage: number;
  limit: number;
  pages: string[];
};

export type { Metadata };
export default Pagination;
