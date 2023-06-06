import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeftSquareIcon } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { api } from "~/lib/api/server";
import { type Collection } from "~/server/db/schema";

import DeleteProduct from "./delete-product";
import EditProduct from "./edit-product";

export default async function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number.isNaN(params.id) ? undefined : params.id;
  if (id == undefined) redirect("/admin/collections");
  const parsedId = Number(id);
  const collection = await api.collection.getCollection.fetch({ id: parsedId });
  if (collection == null || collection == undefined)
    redirect("/admin/collections");
  const collections = await api.collection.getCollectionsSelectable.fetch();
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-between">
          <div className="flex items-center ">
            <Link href={"/admin/collections"} className="pr-2">
              <ChevronLeftSquareIcon />
            </Link>
            Update Collection
          </div>

          <DeleteProduct id={parsedId}></DeleteProduct>
        </H2>
        <EditProduct
          data={collection as Collection}
          collections={collections}
        ></EditProduct>
      </ContentWrapper>
    </div>
  );
}
