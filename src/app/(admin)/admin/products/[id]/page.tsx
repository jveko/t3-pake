import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeftSquareIcon } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { api } from "~/lib/api/server";
import { routesAdmin } from "~/lib/routes";
import { type Product } from "~/server/db/schema";

import DeleteProduct from "./delete-product";
import EditProduct from "./edit-product";

export default async function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number.isNaN(params.id) ? undefined : params.id;
  if (id == undefined) redirect(routesAdmin.products.home);
  const parsedId = Number(id);
  const product = await api.product.getProduct.fetch({ id: parsedId });
  if (product == null || product == undefined)
    redirect(routesAdmin.products.home);
  const collections = await api.collection.getCollectionsSelectable.fetch();
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-between">
          <div className="flex items-center ">
            <Link href={routesAdmin.products.home} className="pr-2">
              <ChevronLeftSquareIcon />
            </Link>
            Update Product
          </div>

          <DeleteProduct id={parsedId}></DeleteProduct>
        </H2>
        <EditProduct
          data={product as Product}
          collections={collections}
        ></EditProduct>
      </ContentWrapper>
    </div>
  );
}
