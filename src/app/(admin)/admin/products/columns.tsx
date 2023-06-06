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
    accessorKey: "collections.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "collections.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "parent.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/admin/collections/${row.original.products.id}`}>
          <EyeIcon />
        </Link>
      );
    },
  },
];
