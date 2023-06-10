"use client";

import React from "react";
import { api } from "~/lib/api/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductTable() {
  const products = api.product.getProducts.useQuery();
  return (
    <>
      {!products.isLoading && (
        <DataTable columns={columns} data={products.data ?? []}></DataTable>
      )}
    </>
  );
}
