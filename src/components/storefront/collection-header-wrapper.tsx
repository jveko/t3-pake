"use client";

import { useState, type PropsWithChildren } from "react";
import { anchorTags } from "~/lib/routes";
import { cn } from "~/lib/utils";
import { Collection } from "~/server/db/schema";

import { Button } from "../ui/button";
import { Heading } from "../ui/heading";

export const CollectionHeaderWrapper = (props: {
  heading: string;
  collection: Collection | undefined;
}) => {
  return (
    <div
      className="overflow-hidden border rounded-md border-border"
      id={anchorTags.collectionHeader}
    >
      <div className="p-6">
        <Heading size="h2">{props.heading}</Heading>
        <div
          className={cn(
            "text-muted-foreground flex flex-col gap-4 mt-2 relative"
          )}
        >
          {props.collection && (
            <Heading size="h4">Collection {props.collection.name} </Heading>
          )}
        </div>
      </div>
    </div>
  );
};
