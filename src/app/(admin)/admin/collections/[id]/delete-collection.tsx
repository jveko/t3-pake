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

export default function DeleteCollection({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: deleteCollection, isLoading } =
    api.collection.deleteCollection.useMutation({
      onSuccess(_, newData) {
        toast({
          title: "Success !!",
          description: "Delete Collection is Success",
        });
        router.push(routesAdmin.collections.home);
      },
      onError() {
        toast({
          variant: "destructive",
          title: "Error !! ",
          description: "Delete Collection is Failed",
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
          <DialogTitle>Are you sure to delete this Collection?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            collection
          </DialogDescription>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                deleteCollection({ id });
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
