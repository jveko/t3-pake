import {ContentWrapper} from "~/components/content-wrapper";
import React, {PropsWithChildren} from "react";
import {Heading} from "~/components/ui/heading";
import Link from "next/link";
import {routes} from "~/lib/routes";
import {Button} from "~/components/ui/button";

export default async function Home() {
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