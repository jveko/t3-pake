import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { currencyFormatter } from "~/lib/currency";
import { routes } from "~/lib/routes";
import { type Cart, type Product } from "~/server/db/schema";

import { ProductImage } from "../product-image";
import { Button } from "../ui/button";
import { EditCartLineItem } from "./edit-cart-line-item";

export const CartLineItems = (props: {
  cartProducts: { carts: Cart; products: Product }[];
  variant: "cart" | "checkout";
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          {props.variant === "cart" ? <TableHead>Price</TableHead> : null}
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.cartProducts?.map(({ carts, products }) => {
          return (
            <TableRow key={carts.id}>
              <TableCell className="font-medium">
                <ProductImage
                  url={products.images[0]?.fileUrl}
                  sizes="50px"
                  height="h-[50px]"
                  width="w-[50px]"
                />
              </TableCell>
              <TableCell className="max-w-[200px] w-[200px] truncate">
                {props.variant === "cart" ? (
                  <Link href={`${routes.product}/${products.slug}`}>
                    <Button className="m-0 p-0 h-auto" variant="link">
                      {products.name}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="m-0 p-0 h-auto hover:no-underline hover:cursor-auto"
                    variant="link"
                  >
                    {products.name}
                  </Button>
                )}
              </TableCell>
              {props.variant === "cart" ? (
                <TableCell>
                  {currencyFormatter(Number(products.price))}
                </TableCell>
              ) : null}
              <TableCell>{carts.qty}</TableCell>
              <TableCell>
                {currencyFormatter(Number(carts.qty) * Number(products.price))}
              </TableCell>
              {props.variant === "cart" ? (
                <TableCell className="text-right">
                  <EditCartLineItem cart={carts} product={products} />
                </TableCell>
              ) : null}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
