"use client";

import Link from "next/link";
import { auth as getAuth } from "@clerk/nextjs/app-beta";
import { ShoppingCart } from "lucide-react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { api } from "~/lib/api/client";
import { routes } from "~/lib/routes";

import { Button } from "../ui/button";
import { EmptyStateWrapper } from "../ui/empty-state-wrapper";
import { Heading } from "../ui/heading";
import { CartLineItems } from "./cart-line-items";
import { SheetWrapper } from "./sheet-wrapper";

export const ShoppingCartHeader = (props: { isAuthenticate: boolean }) => {
  if (!props.isAuthenticate) {
    return (
      <Link href={"sign-in"}>
        <ShoppingCart size={26} />
      </Link>
    );
  }
  const { data: carts, isLoading } = api.cart.getCart.useQuery();
  const numberOfCartItems =
    !!carts && carts.reduce((acc, item) => (acc += Number(item.carts.qty)), 0);
  const conditions = !isLoading && numberOfCartItems && numberOfCartItems > 0;
  return (
    <SheetWrapper
      trigger={
        <SheetTrigger className="relative flex items-center justify-center -left-2">
          <ShoppingCart size={26} />
          {conditions ? (
            <span className="absolute flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-primary -top-2 -right-3">
              {numberOfCartItems}
            </span>
          ) : null}
        </SheetTrigger>
      }
      buttonRoute={conditions ? routes.cart : routes.products}
      insideButton={
        <Button className="w-full">
          {conditions ? "View full cart" : "Start shopping"}
        </Button>
      }
    >
      <SheetHeader>
        <SheetTitle>
          Cart{" "}
          {numberOfCartItems && numberOfCartItems > 0
            ? `(${numberOfCartItems})`
            : ""}
        </SheetTitle>
        <SheetDescription className="flex items-center justify-center p-2 py-3 text-center border rounded-md border-border bg-secondary">
          Free shipping on all orders over $50
        </SheetDescription>
      </SheetHeader>
      {conditions ? (
        <div className="flex flex-col gap-6 mt-6">
          <CartLineItems variant="cart" cartProducts={carts} />
        </div>
      ) : (
        <EmptyStateWrapper height="h-[150px]">
          <Heading size="h4">Your cart is empty</Heading>
        </EmptyStateWrapper>
      )}
    </SheetWrapper>
  );
};
