"use client";

import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { api } from "~/lib/api/client";
import { Collection, Product } from "~/server/db/schema";

import { EmptyStateWrapper } from "../ui/empty-state-wrapper";
import { Heading } from "../ui/heading";
import { LoadingSkeleton } from "../ui/loading-skeleton";
import { ProductCard } from "./product-card";
import { ProductSidebar } from "./product-sidebar";

export const CollectionBody = (
  props: PropsWithChildren<{ collection: Collection | undefined }>
) => {
  const searchParams = useSearchParams();

  const Sidebar = <ProductSidebar collection={props.collection} />;
  const { data: products, isLoading } =
    api.product.getProductsByFilter.useQuery({
      collectionId: props.collection?.id,
    });
  const loadingContent = (
    <div className="grid grid-cols-12 col-span-12 gap-6 lg:col-span-9 h-fit">
      {Array.from(Array(3)).map((_, i) => (
        <div className="col-span-12 sm:col-span-6 md:col-span-4" key={i}>
          <LoadingSkeleton className="w-full h-48" key={i} />
        </div>
      ))}
    </div>
  );
  return (
    <div className="mt-12 md:grid md:grid-cols-12 md:mt-0 lg:mt-5 md:gap-12">
      <div className="hidden p-6 border rounded-md border-border lg:block md:col-span-3">
        {Sidebar}
      </div>
      <div className="lg:hidden">
        <AlertDialog>
          <AlertDialogTrigger className="fixed bottom-0 left-0 z-10 flex items-center justify-end w-full gap-2 px-6 py-4 bg-white">
            <p>Filters</p>
            <SlidersHorizontal size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent className="max-h-[90vh] overflow-auto">
            {Sidebar}
            <AlertDialogFooter className="sticky bottom-0">
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {isLoading ? (
        loadingContent
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-12 col-span-12 gap-6 lg:col-span-9 h-fit">
          {products.map((product, i) => (
            <div className="col-span-12 sm:col-span-6 md:col-span-4" key={i}>
              <ProductCard product={product} />
            </div>
          ))}
          <div className="col-span-12">{props.children}</div>
        </div>
      ) : (
        <EmptyStateWrapper height="h-[200px]">
          <Heading size="h4">No products match your filters</Heading>
          <p>Change your filters or try again later</p>
        </EmptyStateWrapper>
      )}
    </div>
  );
};
