"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { ProductImage } from "~/components/product-image";

export const ProductImageCarousel = (props: {
  images: {
    fileUrl: string;
    fileKey: string;
  }[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  if (props.images.length == 0 || props.images[0] == null) {
    return <ImageOff />;
  }
  useEffect(() => {
    if (props.images.length - 1 <= selectedIndex) {
      setSelectedIndex(props.images.length - 1);
    }
  }, [selectedIndex, props.images]);
  return (
    <>
      <ProductImage
        url={props.images[selectedIndex]!.fileUrl}
        height="h-96"
        width="w-full"
      ></ProductImage>

      {props.images.length > 1 && (
        <>
          <div className="flex items-center justify-start gap-2 mt-2 overflow-auto flex-nowrap">
            {props.images.map((image, idx) => (
              <div
                key={image.fileKey}
                className={`relative h-24 w-24 ${
                  idx === selectedIndex
                    ? "border-solid  border-8 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedIndex(idx)}
              >
                <Image
                  src={image.fileUrl}
                  alt={image.fileUrl}
                  fill
                  className="object-cover h-24 w-24"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
