import {ShoppingCart} from "lucide-react";
import {SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "~/components/ui/sheet";
import {Button} from "./ui/button";
import {routes} from "~/lib/routes";
import {SheetWrapper} from "./storefront/sheet-wrapper";

export const ShoppingCartHeader = () => {
  // const cartId = cookies().get("cartId")?.value;
  // const { cartItems, uniqueStoreIds, cartItemDetails } = await getCart(
  //   Number(cartId)
  // );
  //
  // const numberOfCartItems =
  //   !!cartItems &&
  //   cartItems.reduce((acc, item) => (acc += Number(item.qty)), 0);

  return (
    <SheetWrapper
      trigger={
        <SheetTrigger className="flex items-center justify-center relative -left-2">
          <ShoppingCart size={26}/>
          {/*{numberOfCartItems && numberOfCartItems > 0 ? (*/}
          {/*  <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-2 -right-3">*/}
          {/*    {numberOfCartItems}*/}
          {/*  </span>*/}
          {/*) : null}*/}
        </SheetTrigger>
      }
      buttonRoute={
        routes.cart
      }
      insideButton={
        <Button className="w-full">
          Start shopping
        </Button>
      }
    >
      <SheetHeader>
        <SheetTitle>
          Cart
        </SheetTitle>
        <SheetDescription
          className="border border-border bg-secondary p-2 rounded-md flex items-center justify-center text-center py-3">
          Free shipping on all orders over $50
        </SheetDescription>
      </SheetHeader>

    </SheetWrapper>
  );
};
