"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/lib/api/client";
import { routesAdmin } from "~/lib/routes";

export default function DeleteProduct({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();
  const title = "Product";
  const { mutate: deleteProduct, isLoading } =
    api.product.deleteProduct.useMutation({
      onSuccess(_, newData) {
        toast({
          title: "Success !!",
          description: `Delete ${title} is Success`,
        });
        router.push(routesAdmin.products.home);
      },
      onError() {
        toast({
          variant: "destructive",
          title: "Error !! ",
          description: `Delete ${title} is Failed`,
        });
      },
    });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure to delete this {title}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            {title}
          </DialogDescription>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                deleteProduct({ id });
              }}
            >
              Sure
              {isLoading && <Loader2 className="animate-spin ml-2 w-4" />}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
