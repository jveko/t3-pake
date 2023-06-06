import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeftSquareIcon } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { api } from "~/lib/api/server";
import { type Collection } from "~/server/db/schema";

import DeleteCollection from "./delete-collection";
import EditCollection from "./edit-collection";

export default async function CollectionEdit({
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

          <DeleteCollection id={parsedId}></DeleteCollection>
        </H2>
        <EditCollection
          data={collection as Collection}
          collections={collections}
        ></EditCollection>
      </ContentWrapper>
    </div>
  );
}
