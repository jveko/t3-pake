import { type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

export const ContentWrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn(`max-w-[1400px] m-auto p-6`, className)}>{children}</div>
  );
};
