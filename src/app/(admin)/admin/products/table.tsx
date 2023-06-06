"use client";

import React from "react";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/lib/api/client";

import { columns } from "./columns";

export default function ProductTable() {
  const products = api.product.getProducts.useQuery();
  return <DataTable columns={columns} data={products.data ?? []}></DataTable>;
}
