import { eq, inArray } from "drizzle-orm";

import { PaginationRow } from "../pagination-row";

export const CollectionPagePagination = (props: {
  productsPerPage: number;
  totalProduct: number;
}) => {
  const unroundedNumberOfPages = props.totalProduct / props.productsPerPage;

  const numberOfPages =
    unroundedNumberOfPages === Math.floor(unroundedNumberOfPages)
      ? unroundedNumberOfPages
      : Math.floor(unroundedNumberOfPages) + 1;

  return (
    <PaginationRow pagesArray={Array.from(Array(numberOfPages).fill(0))} />
  );
};
