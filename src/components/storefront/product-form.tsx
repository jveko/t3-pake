"use client";

import { useState, useTransition } from "react";
import { api } from "~/lib/api/client";
import { routes } from "~/lib/routes";
import { handleInputQuantity } from "~/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";

export const ProductForm = (props: {
  stock: number;
  productId: number;
  productName: string | null;
  buttonSize?: "default" | "sm";
}) => {
  const [quantity, setQuantity] = useState<string | number>(1);

  const apiCtx = api.useContext();
  const { mutate: addCart, isLoading } = api.cart.add.useMutation({
    onSuccess() {
      toast({
        title: "Added to cart",
        description: `${quantity}x ${props.productName} has been added to your cart.`,
        action: (
          <a href={routes.cart}>
            <ToastAction altText="View cart">View</ToastAction>
          </a>
        ),
      });
      apiCtx.cart.getCart.refetch();
    },
  });
  return (
    <div className="flex items-end justify-start gap-4">
      {props.stock && props.stock > 0 && (
        <div className="flex flex-col gap-1 items-start">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            className="w-24"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onBlur={(e) => handleInputQuantity(e, setQuantity)}
            type="number"
            min={1}
          />
        </div>
      )}
      {props.stock && props.stock > 0 ? (
        <Button
          size={props.buttonSize ?? "default"}
          className="w-36"
          onClick={() => {
            addCart({
              productId: props.productId,
              qty: Number(quantity),
            });
          }}
          loading={isLoading}
        >
          Add to Cart
        </Button>
      ) : (
        <Button variant="default" disabled={true} className="w-36">
          Sold Out
        </Button>
      )}
    </div>
  );
};
