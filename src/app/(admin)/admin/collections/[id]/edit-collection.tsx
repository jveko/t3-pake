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
import { routesAdmin } from "~/lib/routes";
import { type Collection, type CollectionSelectable } from "~/server/db/schema";

export const editCollectionsSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  parentId: z.string().optional(),
});

type EditCollectionSchema = z.infer<typeof editCollectionsSchema>;

export const initialFormData: DefaultValues<EditCollectionSchema> = {
  id: undefined,
  name: undefined,
  parentId: undefined,
};

export default function EditCollection({
  data,
  collections,
}: {
  data: Collection;
  collections: CollectionSelectable[];
}) {
  const apiCtx = api.useContext();
  const form = useForm<EditCollectionSchema>({
    resolver: zodResolver(editCollectionsSchema),
    defaultValues: {
      id: data.id,
      name: data.name ? data.name : undefined,
      parentId: data.parent_id ? data.parent_id.toString() : undefined,
    },
  });
  const router = useRouter();

  const { mutate: editCollection, isLoading } =
    api.collection.editCollection.useMutation({
      async onSuccess(_, newData) {
        await apiCtx.collection.getCollections.refetch();
        form.reset(newData);
        router.push(routesAdmin.collections.home);
      },
    });

  function onSubmit(values: EditCollectionSchema) {
    editCollection(values);
  }

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
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          Save changes
          {isLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
