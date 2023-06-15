"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { DataTableColumnHeader } from "~/components/data-table-header";
import { type Collection, type Product } from "~/server/db/schema";

export const columns: ColumnDef<{
  products: Product;
  collections: Collection;
}>[] = [
  {
    accessorFn: (row) => `${row.products.id}`,
    accessorKey: "products.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    id: "name",
    accessorFn: (row) => `${row.products.name}`,
    accessorKey: "products.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorFn: (row) => `${row.products.description}`,
    accessorKey: "products.description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorFn: (row) => `${row.products.stock}`,
    accessorKey: "products.stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorFn: (row) => `${row.products.price}`,
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
