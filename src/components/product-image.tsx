import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "~/lib/utils";

export const ProductImage = (props: {
  url: string | undefined;
  sizes?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  height: `h-${string}`;
  width: `w-${string}`;
}) => {
  return (
    <>
      {props.url ? (
        <div
          className={cn(
            "relative",
            props.height,
            props.width,
            props.wrapperClassName
          )}
        >
          <Image
            src={props.url}
            alt={props.url}
            fill
            sizes={props.sizes}
            className={cn(
              "object-cover",
              props.imageClassName,
              props.height,
              props.width
            )}
          />
        </div>
      ) : (
        <div
          className={cn(
            "bg-secondary flex justify-center items-center",
            props.height,
            props.width
          )}
        >
          <ImageOff />
        </div>
      )}
    </>
  );
};
