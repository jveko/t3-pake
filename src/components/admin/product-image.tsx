import Image from "next/image";
import { ImageOff, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

import { Button } from "../ui/button";

export const ProductImage = (props: {
  url: string;
  delete: () => Promise<void>;
  height: `h-${string}`;
  width: `w-${string}`;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className={cn("relative", props.height, props.width, "border")}>
        <Image
          src={props.url}
          alt={props.url}
          fill
          className={cn("object-cover", props.height, props.width)}
        />
      </div>
      <Button
        className={cn("relative", "h-6", props.width)}
        variant={"outline"}
        onClick={props.delete}
      >
        Delete
        {props.isLoading && <Loader2 className="animate-spin ml-2 w-4" />}
      </Button>
    </>
  );
};
