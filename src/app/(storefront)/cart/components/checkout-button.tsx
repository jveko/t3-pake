"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";

export const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="ml-auto flex items-center gap-2 justify-center"
      onClick={() => {
        setIsLoading(true);
        // getStoreSlug(props.storeId)
        //   .then((slug) => {
        //     router.push(`/checkout/${slug}`);
        //   })
        //   .catch(() => {
        //     toast({
        //       title: "Sorry, an error occurred.",
        //       description: "Something went wrong. Please try again later.",
        //     });
        //   })
        //   .finally(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Lock size={16} />
      )}
      <p>Checkout</p>
    </Button>
  );
};
