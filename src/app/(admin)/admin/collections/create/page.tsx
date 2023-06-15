import React from "react";
import Link from "next/link";
import { ChevronLeftSquareIcon } from "lucide-react";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { api } from "~/lib/api/server";

import CreateCollection from "./create-collection";

export default async function CollectionCreate() {
  const collections = await api.collection.getCollectionsSelectable.fetch();
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-start">
          <Link href={"/admin/collections"} className="pr-2">
            <ChevronLeftSquareIcon />
          </Link>
          Create Collection
        </H2>
        <CreateCollection collections={collections}></CreateCollection>
      </ContentWrapper>
    </div>
  );
}
