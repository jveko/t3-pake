"use client";

import React from "react";
import { LoadingSkeleton } from "~/components/ui/loading-skeleton";

export default function LoadingTable() {
  return (
    <div>
      <div className="flex items-center py-4">
        <LoadingSkeleton className="w-96 h-10" />
      </div>
      <div>
        <LoadingSkeleton className="w-full h-96" />
      </div>
    </div>
  );
}
