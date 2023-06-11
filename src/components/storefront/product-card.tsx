import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { currencyFormatter } from "~/lib/currency";
import { routes } from "~/lib/routes";
import { Product } from "~/server/db/schema";

import { ProductImage } from "../product-image";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

// import { ProductForm } from "./product-form";

export const ProductCard = (props: {
  product: Product;
  hideButtonActions?: boolean;
}) => {
  const productPageLink = `${routes.product}/${props.product.slug}`;

  return (
    <div key={props.product.id}>
      <Link href={productPageLink}>
        <ProductImage
          url={props.product.images[0]?.fileUrl}
          height="h-48"
          width="w-full"
        />
      </Link>
      <Link href={productPageLink}>
        <Text className="line-clamp-1 w-full mt-2">{props.product.name}</Text>
        <Text>{currencyFormatter(Number(props.product.price))}</Text>
      </Link>
      {/* {!props.hideButtonActions && (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-4 mb-8">
          <Link
            href={`${routes.productQuickView}/${[
              props.storeAndProduct.product.id,
            ]}`}
            className="w-full"
          >
            <Button variant="outline" size="sm" className="flex gap-2 w-full">
              <span>Quick View</span>
            </Button>
          </Link>
          <ProductForm
            disableQuantitySelector={true}
            availableInventory={props.storeAndProduct.product.inventory}
            productId={props.storeAndProduct.product.id}
            productName={props.storeAndProduct.product.name}
            buttonSize="sm"
          />
        </div>
      )} */}
    </div>
  );
};
