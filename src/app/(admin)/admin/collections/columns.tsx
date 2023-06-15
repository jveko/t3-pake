"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { DataTableColumnHeader } from "~/components/data-table-header";
import { type Collection } from "~/server/db/schema";

export const columns: ColumnDef<{
  collections: Collection;
  parent: Collection | null;
}>[] = [
  {
    accessorKey: "collections.id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    id: "name",
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
        <Link href={`/admin/collections/${row.original.collections.id}`}>
          <EyeIcon />
        </Link>
      );
    },
  },
];
