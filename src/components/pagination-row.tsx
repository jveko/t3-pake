"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { PaginationButton } from "./pagination-button";
import { Button } from "./ui/button";

export const PaginationRow = (props: { pagesArray: number[] }) => {
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get("page");
  const pathname = usePathname() as string;
  const SELLER_PARAMS = searchParams?.get("seller")
    ? `&seller=${searchParams.get("seller") ?? ""}`
    : "";

  const okToApplyPageCommand =
    !isNaN(Number(pageParam)) &&
    Number(pageParam) - 1 >= 1 &&
    Number(pageParam) !== props.pagesArray.length &&
    Number(pageParam) !== props.pagesArray.length - 1;

  return (
    <div className="flex items-center justify-center gap-2">
      {!isNaN(Number(pageParam)) && Number(pageParam) - 1 >= 1 && (
        <Link
          href={`${pathname}?page=${(
            Number(pageParam) - 1
          ).toString()}${SELLER_PARAMS}`}
        >
          <Button variant="subtle">Prev</Button>
        </Link>
      )}
      {props.pagesArray.length <= 4
        ? props.pagesArray.length > 1 && (
            <div className="flex items-center justify-between gap-2">
              {props.pagesArray.map((_, i) => (
                <Link
                  href={`${pathname}?page=${(
                    i + 1
                  ).toString()}${SELLER_PARAMS}`}
                  key={i}
                >
                  <PaginationButton pageNumber={i + 1} searchParamName="page" />
                </Link>
              ))}
            </div>
          )
        : [
            !!okToApplyPageCommand ? Number(pageParam) - 1 : 1,
            !!okToApplyPageCommand ? Number(pageParam) : 2,
            props.pagesArray.length - 1,
            props.pagesArray.length,
          ].map((item, i) => (
            <div className="flex items-center justify-between gap-2" key={i}>
              {item === props.pagesArray.length - 1 &&
                (!!okToApplyPageCommand ? Number(pageParam) : 2) !==
                  item - 1 && <div className="h-10 px-2 py-2">...</div>}
              <Link
                href={`${pathname}?page=${Number(
                  item
                ).toString()}${SELLER_PARAMS}`}
                key={i}
              >
                <PaginationButton
                  pageNumber={Number(item)}
                  searchParamName="page"
                />
              </Link>
            </div>
          ))}
      {!isNaN(Number(pageParam)) &&
        Number(pageParam) + 1 <= props.pagesArray.length &&
        props.pagesArray.length > 1 && (
          <Link
            href={`${pathname}?page=${(!isNaN(Number(pageParam)) &&
            Number(pageParam) + 1 > 2
              ? Number(pageParam) + 1
              : 2
            ).toString()}${SELLER_PARAMS}`}
          >
            <Button variant="subtle">Next</Button>
          </Link>
        )}
    </div>
  );
};
