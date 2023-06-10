"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@uploadthing/react";
import { Loader2 } from "lucide-react";
import { useForm, type DefaultValues } from "react-hook-form";
import { utapi } from "uploadthing/server";
import { z } from "zod";
import { OurFileRouter } from "~/app/api/uploadthing/core";
import { ProductImage } from "~/components/admin/product-image";
import { P } from "~/components/typography";
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
import { routes, routesAdmin } from "~/lib/routes";
import { CollectionSelectable, type Collection } from "~/server/db/schema";

export const createProductSchema = z.object({
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

type CreateProductSchema = z.infer<typeof createProductSchema>;

export const initialFormData: DefaultValues<CreateProductSchema> = {
  name: undefined,
  stock: 0,
  price: 0,
  description: undefined,
  collectionId: undefined,
  images: [],
};

export default function CreateProduct({
  collections,
}: {
  collections: CollectionSelectable[];
}) {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialFormData,
  });

  function onSubmit(values: CreateProductSchema) {
    createProduct(values);
  }

  const router = useRouter();

  const { mutate: createProduct, isLoading } =
    api.product.createProduct.useMutation({
      onSuccess() {
        form.reset();
        router.push(routesAdmin.products.home);
      },
    });

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
    <>
      <Form {...form}>
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
                <Select onValueChange={field.onChange}>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                {form.getValues("images").map((x) => (
                  <ProductImage
                    url={x.fileUrl}
                    delete={async () => {
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
                    // Do something with the response
                    console.log("Files: ", res);
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
        <Button onClick={form.handleSubmit(onSubmit)}>
          Save Product
          {isLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
        </Button>
      </Form>
    </>
  );
}
