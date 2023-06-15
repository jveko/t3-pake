"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CartLineItems } from "~/components/storefront/cart-line-items";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { api } from "~/lib/api/client";
import { currencyFormatter } from "~/lib/currency";
import { routes } from "~/lib/routes";

import { CheckoutButton } from "./components/checkout-button";
import Loading from "./loading";

export default function Cart() {
  const { data: carts, isLoading } = api.cart.getCart.useQuery();
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!carts?.length) {
    return (
      <div className="mt-4 gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center h-[200px] flex items-center justify-center flex-col">
        <Heading size="h3">Your cart is empty</Heading>
        <Link href={routes.products}>
          <Button>Start shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading size="h2">Cart</Heading>
        <Link href={routes.products}>
          <Button
            variant="link"
            className="flex items-end justify-center p-0 m-0 text-muted-foreground"
          >
            <p>Continue shopping</p>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-9 lg:gap-6">
        <div className="flex flex-col col-span-6 gap-8">
          <CartLineItems variant="cart" cartProducts={carts} />
        </div>
        <div className="flex flex-col col-span-3 gap-4 p-6 border rounded-md bg-secondary border-border h-fit">
          <Heading size="h3">Cart Summary</Heading>
          <div className="flex items-center gap-4 pb-2 overflow-auto border-b border-border flex-nowrap">
            <p>
              {currencyFormatter(
                carts.reduce((accum, curr) => {
                  return (
                    accum + Number(curr.products.price) * (curr.carts.qty ?? 0)
                  );
                }, 0)
              )}
            </p>
            <CheckoutButton></CheckoutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
