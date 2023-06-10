"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon, ViewIcon } from "lucide-react";
import { DataTableColumnHeader } from "~/components/data-table-header";
import { Product, type Collection } from "~/server/db/schema";

export const columns: ColumnDef<{
  products: Product;
  collections: Collection;
}>[] = [
  {
    accessorKey: "products.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    id: "name",
    accessorKey: "products.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "products.description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "products.stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "products.price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/admin/products/${row.original.products.id}`}>
          <EyeIcon />
        </Link>
      );
    },
  },
];
