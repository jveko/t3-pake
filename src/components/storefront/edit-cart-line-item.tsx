"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { api } from "~/lib/api/client";
import { CartItem, CartLineItemDetails } from "~/lib/types";
import { handleInputQuantity } from "~/lib/utils";
import { cartRouter } from "~/server/api/routers/cart";
import { Cart, Product } from "~/server/db/schema";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

export const EditCartLineItem = (props: { cart: Cart; product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<string | number>(
    props.cart.qty ?? 1
  );
  const apiCtx = api.useContext();
  const { mutate: updateCart, isLoading: isLoadingUpdate } =
    api.cart.update.useMutation({
      onSuccess() {
        toast({
          title: "Cart updated",
          description: `${props.product.name} has been removed from your cart.`,
        });
        apiCtx.cart.getCart.refetch();
      },
    });
  const { mutate: removeCart, isLoading: isLoadingRemove } =
    api.cart.remove.useMutation({
      onSuccess() {
        toast({
          title: "Cart updated",
          description: `${props.product.name} has been removed from your cart.`,
        });
        apiCtx.cart.getCart.refetch();
      },
    });
  return (
    <>
      <AlertDialog open={isOpen}>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="outline">
          Edit
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit {props.product.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Change the quantity or remove this item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mb-6">
            <Label className="my-2 block">Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={(e) => handleInputQuantity(e, setQuantity, 0)}
            />
          </div>
          <AlertDialogFooter className="flex items-center justify-between">
            <Button
              variant="destructive"
              className="mr-auto"
              onClick={() => {
                setIsOpen((prev) => !prev);
                if (props.cart) {
                  removeCart({
                    id: props.cart.id,
                  });
                }
              }}
            >
              Remove from cart
              {isLoadingRemove && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
            <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!props.cart}
              onClick={() => {
                setIsOpen((prev) => !prev);
                if (props.cart) {
                  updateCart({
                    id: props.cart.id,
                    qty: Number(quantity),
                  });
                }
              }}
            >
              Update
              {isLoadingUpdate && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
