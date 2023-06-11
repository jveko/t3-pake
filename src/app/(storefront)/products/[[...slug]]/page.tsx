import { CollectionBody } from "~/components/storefront/collection-body";
import { CollectionHeaderWrapper } from "~/components/storefront/collection-header-wrapper";
import { CollectionPagePagination } from "~/components/storefront/collection-page-pagination";
import { api } from "~/lib/api/server";
import { Collection } from "~/server/db/schema";

const PRODUCTS_PER_PAGE = 6;

export default async function StorefrontProductsPage({
  params,
  searchParams,
}: {
  params: { slug: string[] } | undefined;
  searchParams: { page: string; seller: string };
}) {
  const slugCollection =
    params && params.slug && params.slug.length > 0
      ? params.slug[0]
      : undefined;
  const totalProduct = await api.product.count.fetch({});
  const collection = slugCollection
    ? ((await api.collection.getCollectionBySlug.fetch({
        slug: slugCollection,
      })) as Collection)
    : undefined;
  return (
    <div>
      <CollectionHeaderWrapper
        heading="Products"
        collection={collection}
      ></CollectionHeaderWrapper>
      <CollectionBody collection={collection}>
        <CollectionPagePagination
          productsPerPage={PRODUCTS_PER_PAGE}
          totalProduct={totalProduct}
        />
      </CollectionBody>
    </div>
  );
}
