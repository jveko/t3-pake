"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { ContentWrapper } from "~/components/content-wrapper";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { api } from "~/lib/api/client";
import { routes } from "~/lib/routes";

export default async function Home() {
  const { data: products, isLoading } = api.product.getProducts.useQuery();
  console.log(products);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto mt-2">
            {/* {isLoading && products && products} */}
            {/*{storeAndProduct.map((item) => (*/}
            {/*  <ProductCard*/}
            {/*    key={item.product.id}*/}
            {/*    storeAndProduct={item}*/}
            {/*    hideButtonActions={true}*/}
            {/*  />*/}
            {/*))}*/}
          </div>
          <div className="mt-12 grid place-content-center">
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
      <div className="flex flex-col items-center justify-center gap-2 text-center mb-12 pt-2">
        {props.heading}
        <div className="text-slate-600">{props.subheading}</div>
      </div>
      {props.children}
    </>
  );
};
