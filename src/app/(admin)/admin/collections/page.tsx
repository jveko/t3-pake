import React from "react";
import Link from "next/link";
import { DataTable } from "~/app/(admin)/admin/collections/data-table";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/api/server";
import { routesAdmin } from "~/lib/routes";

import { columns } from "./columns";
import CollectionTable from "./table";

export default async function CollectionPage() {
  return (
    <div>
      <ContentWrapper>
        <H2 className="mb-5 flex items-center justify-between">
          Collections
          <Link href={routesAdmin.collections.create}>
            <Button>Create Collection</Button>
          </Link>
        </H2>
        <CollectionTable></CollectionTable>
      </ContentWrapper>
    </div>
  );
}
