"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { ProductCard } from "~/components/storefront/product-card";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { LoadingSkeleton } from "~/components/ui/loading-skeleton";
import { api } from "~/lib/api/client";
import { routes } from "~/lib/routes";

export default function Home() {
  const { data: products, isLoading } = api.product.getHome.useQuery();
  return (
    <div>
      <ContentWrapper>
        <HomePageLayout
          heading={<Heading size="h1">Online shopping made easy.</Heading>}
          subheading={
            <Heading size="h2">
              Shop hundreds of products from sellers worldwide.
            </Heading>
          }
        >
          <Heading size="h3">Top Picks</Heading>

          <div className="grid grid-cols-1 gap-6 mt-2 overflow-auto md:grid-cols-2 lg:grid-cols-4">
            {!isLoading
              ? products!.map((x, i) => (
                  <ProductCard key={i} product={x}></ProductCard>
                ))
              : Array.from(Array(4)).map((_, i) => (
                  <LoadingSkeleton className="w-full h-48" key={i} />
                ))}
          </div>
          <div className="grid mt-12 place-content-center">
            <Link href={routes.products}>
              <Button variant="default">View All Products</Button>
            </Link>
          </div>
        </HomePageLayout>
      </ContentWrapper>
    </div>
  );
}

const HomePageLayout = (
  props: PropsWithChildren<{
    heading: React.ReactNode;
    subheading: React.ReactNode;
  }>
) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pt-2 mb-12 text-center">
        {props.heading}
        <div className="text-slate-600">{props.subheading}</div>
      </div>
      {props.children}
    </>
  );
};
