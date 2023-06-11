"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/lib/api/client";
import { anchorTags, routes } from "~/lib/routes";
import { Collection } from "~/server/db/schema";

import { Button } from "../ui/button";
import { Heading } from "../ui/heading";

export const ProductSidebar = (props: {
  collection: Collection | undefined;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page");
  const { data: collections, isLoading } = api.collection.getMenu.useQuery();
  return (
    <div>
      <div className="flex items-center justify-between w-full gap-2">
        <Heading size="h3">Filters</Heading>
        {props.collection && (
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground"
            onClick={() => {
              router.push(routes.products);
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="mt-4">
        <Heading size="h4">Collections</Heading>
        {!isLoading && collections ? (
          <>
            <Select
              defaultValue={props.collection?.slug}
              onValueChange={(value) => {
                var arrRoute = [routes.products, "/", value];
                if (page) arrRoute.push(...["?", "page=", page]);
                router.push(arrRoute.join(""));
              }}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {collections.map((x, i) => (
                    <SelectItem key={i} value={x.slug}>
                      {x.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const FilterGroup = (props: { heading: string }) => {
  return (
    <div className="mt-4">
      <Heading size="h4">{props.heading}</Heading>
    </div>
  );
};

ProductSidebar.Group = FilterGroup;
