import Link from "next/link";
import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs/app-beta";
import { LockIcon, UserIcon } from "lucide-react";
import { ProductSearch } from "~/components/storefront/product-search";
import { ShoppingCartHeader } from "~/components/storefront/shopping-cart-header";
import { cn } from "~/lib/utils";

import { ContentWrapper } from "../content-wrapper";
import { Line } from "../line";
import { Logo } from "../logo";
import { MenuItems } from "./menu-items";

// import { MobileNavigation } from "./mobile-navigation";
// import { ShoppingCartHeader } from "./shopping-cart-header";
// import { ProductSearch } from "./storefront/product-search";

export const NavBar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { userId } = auth();
  const isAuthenticate = userId != null;
  return (
    <>
      <nav className={cn("pb-1 sticky top-0 bg-white z-10 shadow-sm")}>
        <ContentWrapper className="flex flex-wrap items-center justify-between gap-4 md:hidden">
          <Logo />
          <div className="flex items-center gap-8 ml-auto">
            {/*<ShoppingCartHeader />*/}
            {/*<MobileNavigation />*/}
          </div>
        </ContentWrapper>
        <ContentWrapper className="hidden md:block">
          <ul className="flex items-center justify-between gap-12 py-2">
            <li>
              <Link href={{ pathname: "/" }}>
                <Logo />
              </Link>
            </li>
            <li className="flex-1">
              <ProductSearch />
            </li>
            <li>
              <ShoppingCartHeader isAuthenticate={isAuthenticate} />
            </li>
            {isAuthenticate && (
              <li>
                <Link href={"/account"}>
                  <UserIcon />
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link href={"/admin"}>
                  <LockIcon />
                </Link>
              </li>
            )}
            <li>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link href={"sign-in"}>
                  <UserIcon />
                </Link>
              </SignedOut>
            </li>
          </ul>
        </ContentWrapper>
        <Line className="hidden md:block" />
        <ContentWrapper className="hidden py-0 md:block">
          <div className="mt-1 -ml-4">
            <MenuItems />
          </div>
        </ContentWrapper>
      </nav>
      <Line />
    </>
  );
};
