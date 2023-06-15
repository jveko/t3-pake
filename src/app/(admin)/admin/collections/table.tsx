"use client";

import React from "react";
import { api } from "~/lib/api/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function CollectionTable() {
  const { data: collections, isLoading } =
    api.collection.getCollections.useQuery();
  return (
    <>
      {!isLoading && collections && (
        <DataTable columns={columns} data={collections ?? []}></DataTable>
      )}
    </>
  );
}
