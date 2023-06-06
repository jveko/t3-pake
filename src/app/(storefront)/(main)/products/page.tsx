import {CollectionHeaderWrapper} from "~/components/storefront/collection-header-wrapper";


const PRODUCTS_PER_PAGE = 6;

export default function StorefrontProductsPage(context: {
  params: { slug: string };
  searchParams: { page: string; seller: string };
}) {

  return (
    <div>
      <CollectionHeaderWrapper heading="Products">
      </CollectionHeaderWrapper>
      {/*<CollectionBody*/}
      {/*  storeAndProduct={storeAndProduct}*/}
      {/*  activeSellers={await getActiveSellers()}*/}
      {/*>*/}
      {/*  /!* @ts-expect-error Async Server Component *!/*/}
      {/*  <CollectionPagePagination*/}
      {/*    productsPerPage={PRODUCTS_PER_PAGE}*/}
      {/*    sellerParams={context.searchParams.seller as string}*/}
      {/*  />*/}
      {/*</CollectionBody>*/}
    </div>
  );
}

