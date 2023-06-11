import { LoadingSkeleton } from "~/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div>
      <LoadingSkeleton.CollectionHeaderWrapper />
      <div className="gap-12 mt-8 md:grid md:grid-cols-12">
        <LoadingSkeleton className="hidden w-full md:block md:col-span-3 md:h-full" />
        <div className="flex flex-col gap-8 md:col-span-9 sm:grid md:grid-cols-3 sm:grid-cols-2">
          {Array.from(Array(12)).map((_, i) => (
            <LoadingSkeleton key={i} className="w-full h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
