"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";
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
import { api } from "~/lib/api/client";
import { routes, routesAdmin } from "~/lib/routes";
import { CollectionSelectable, type Collection } from "~/server/db/schema";

export const createCollectionSchema = z.object({
  name: z.string().min(1),
  parentId: z.string().optional(),
});

type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;

export const initialFormData: DefaultValues<CreateCollectionSchema> = {
  name: undefined,
  parentId: undefined,
};

export default function CreateCollection({
  collections,
}: {
  collections: CollectionSelectable[];
}) {
  const form = useForm<CreateCollectionSchema>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: initialFormData,
  });

  function onSubmit(values: CreateCollectionSchema) {
    createCollection(values);
  }

  const router = useRouter();

  const { mutate: createCollection, isLoading } =
    api.collection.createCollection.useMutation({
      onSuccess() {
        form.reset();
        router.push(routesAdmin.collections.home);
      },
    });

  return (
    <>
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
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent" />
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
          </div>
          <Button type="submit">
            Save Collection
            {isLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
          </Button>
        </form>
      </Form>
    </>
  );
}
