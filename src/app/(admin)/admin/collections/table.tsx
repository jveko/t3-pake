"use client";

import React from "react";
import { api } from "~/lib/api/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function CollectionTable() {
  const collections = api.collection.getCollections.useQuery();
  return (
    <>
      {!collections.isLoading && (
        <DataTable columns={columns} data={collections.data ?? []}></DataTable>
      )}
    </>
  );
}
