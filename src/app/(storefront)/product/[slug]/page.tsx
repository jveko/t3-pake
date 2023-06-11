import { redirect } from "next/navigation";
import { ParagraphFormatter } from "~/components/paragraph-formatter";
import { FeatureIcons } from "~/components/storefront/feature-icons";
import { ProductForm } from "~/components/storefront/product-form";
import { ProductImageCarousel } from "~/components/storefront/product-image-carousel";
import { Heading } from "~/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { api } from "~/lib/api/server";
import { currencyFormatter } from "~/lib/currency";
import { routes } from "~/lib/routes";

export default async function ProductDetails(props: {
  params: { slug: string };
}) {
  const product = await api.product.getProductBySlug.fetch({
    slug: props.params.slug,
  });
  if (product == null) redirect(routes.products);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
        <div className="col-span-4 w-full">
          <ProductImageCarousel images={product.images} />
        </div>
        <div className="md:col-span-5 w-full">
          <Heading size="h2">{product.name}</Heading>
          <Text className="text-xl my-4">
            {currencyFormatter(Number(product.price))}
          </Text>
          <ProductForm
            productName={product.name}
            stock={product.stock}
            productId={product.id}
          />
          <FeatureIcons className="mt-8" />
        </div>
      </div>
      <Tabs defaultValue="product">
        <div className="overflow-auto">
          <TabsList>
            <TabsTrigger value="product">Product Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="product" className="pt-2">
          <ParagraphFormatter paragraphs={product.description} />
        </TabsContent>
        <TabsContent value="reviews" className="pt-2"></TabsContent>
      </Tabs>
    </div>
  );
}
