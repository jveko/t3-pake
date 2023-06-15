"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { api } from "~/lib/api/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductTable() {
  const { data: products, isLoading } = api.product.getProducts.useQuery();
  return (
    <>
      {!isLoading && products ? (
        <DataTable columns={columns} data={products ?? []}></DataTable>
      ) : (
        <Loader2 className="animate-spin ml-2 w-4" />
      )}
    </>
  );
}
