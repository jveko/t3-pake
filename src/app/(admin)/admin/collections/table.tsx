"use client";

import React from "react";
import Link from "next/link";
import { ContentWrapper } from "~/components/content-wrapper";
import { H2 } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/lib/api/client";

import { columns } from "./columns";

export default function CollectionTable() {
  const collections = api.collection.getCollections.useQuery();
  return (
    <DataTable columns={columns} data={collections.data ?? []}></DataTable>
  );
}
