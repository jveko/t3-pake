import { LoadingSkeleton } from "~/components/ui/loading-skeleton";

import LoadingTable from "./loading-table";

export default function Loading() {
  return (
    <div>
      <LoadingSkeleton className="w-full h-96" />
      <div className="flex gap-2 items-center justify-center mt-2 mb-6">
        {Array.from(Array(3)).map((_, i) => (
          <LoadingSkeleton className="w-3 h-3 rounded-full" key={i} />
        ))}
      </div>
      <LoadingTable></LoadingTable>
    </div>
  );
}
