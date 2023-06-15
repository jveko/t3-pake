import React from "react";
import Link from "next/link";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { routesAdmin } from "~/lib/routes";

import ProductTable from "./table";

export default function ProductPage() {
  console.log(process.env);
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-between">
          Products
          <Link href={routesAdmin.products.create}>
            <Button>Create Product</Button>
          </Link>
        </H2>
        <ProductTable></ProductTable>
      </ContentWrapper>
    </div>
  );
}
