import { LoadingSkeleton } from "~/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex items-end justify-between mb-4">
          <LoadingSkeleton className="w-48 h-12" />
          <LoadingSkeleton className="h-8 w-36" />
        </div>
        <div className="grid grid-cols-9 gap-24">
          <div className="flex flex-col col-span-6 gap-4">
            {Array.from(Array(6)).map((_, i) => (
              <LoadingSkeleton className="w-full h-12" key={i} />
            ))}
          </div>
          <div className="col-span-3">
            <LoadingSkeleton className="w-full h-96" />
          </div>
        </div>
      </div>
    </>
  );
}
