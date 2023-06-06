import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronLeftSquareIcon } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { api } from "~/lib/api/server";
import { routesAdmin } from "~/lib/routes";

import CreateProduct from "./create-product";

export default async function ProductCreatePage() {
  const collections = await api.collection.getCollectionsSelectable.fetch();
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-start">
          <Link href={routesAdmin.products.home} className="pr-2">
            <ChevronLeftSquareIcon />
          </Link>
          Create Product
        </H2>
        <CreateProduct collections={collections}></CreateProduct>
      </ContentWrapper>
    </div>
  );
}
