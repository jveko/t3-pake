import {Table, TableBody, TableHead, TableHeader, TableRow,} from "~/components/ui/table";
import {CartItem, CartLineItemDetails} from "~/lib/types";
// import { ProductImage } from "../product-image";

export const CartLineItems = (props: {
  cartItems: CartItem[];
  products: CartLineItemDetails[];
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
      </TableBody>
    </Table>
  );
};
