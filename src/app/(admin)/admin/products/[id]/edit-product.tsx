"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@uploadthing/react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type OurFileRouter } from "~/app/api/uploadthing/core";
import { ProductImage } from "~/components/admin/product-image";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/lib/api/client";
import { routesAdmin } from "~/lib/routes";
import { type CollectionSelectable, type Product } from "~/server/db/schema";

export const editProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  stock: z.coerce.number().positive().min(0),
  price: z.coerce.number().positive().min(0),
  description: z.string().min(1),
  collectionId: z.string().min(1),
  images: z
    .array(
      z.object({
        fileUrl: z.string(),
        fileKey: z.string(),
      })
    )
    .min(1),
});

type EditProductSchema = z.infer<typeof editProductSchema>;

export default function EditProduct({
  data,
  collections,
}: {
  data: Product;
  collections: CollectionSelectable[];
}) {
  const apiCtx = api.useContext();
  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      stock: data.stock,
      price: Number(data.price),
      description: data.description,
      collectionId: data.collection_id.toString(),
      images: data.images,
    },
  });
  const router = useRouter();

  const { mutate: editProduct, isLoading } =
    api.product.editProduct.useMutation({
      async onSuccess(_, newData) {
        await apiCtx.product.getProducts.refetch();
        form.reset(newData);
        router.push(routesAdmin.products.home);
      },
    });

  function onSubmit(values: EditProductSchema) {
    editProduct(values);
  }

  const { mutate: deleteImage, isLoading: isLoadingDeleteImage } =
    api.image.delete.useMutation({
      onSuccess(data) {
        alert("success");
        form.setValue("images", [
          ...form.getValues("images").filter((x) => x.fileKey != data.key),
        ]);
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price..." {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Stock..." {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Collection" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.map((x, i) => (
                      <SelectItem value={x.id.toString()} key={i}>
                        {x.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({}) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                {form.getValues("images").map((x, i) => (
                  <ProductImage
                    key={i}
                    url={x.fileUrl}
                    delete={() => {
                      deleteImage({ key: x.fileKey });
                    }}
                    height="h-48"
                    width="w-48"
                    isLoading={isLoadingDeleteImage}
                  />
                ))}
                <UploadButton<OurFileRouter>
                  endpoint="imageProduct"
                  onClientUploadComplete={(res) => {
                    if (res != null) {
                      form.setValue("images", [
                        ...form.getValues("images"),
                        ...res.map((x) => x),
                      ]);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(error.message);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          Save changes
          {isLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
