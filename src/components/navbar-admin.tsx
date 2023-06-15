import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";
import { LockIcon, StoreIcon, UserIcon } from "lucide-react";
import { MenuItemsAdmin } from "~/components/menu-items-admin";
import { cn } from "~/lib/utils";

import { ContentWrapper } from "./content-wrapper";
import { Line } from "./line";
import { Logo } from "./logo";

// import { MobileNavigation } from "./mobile-navigation";
// import { ShoppingCartHeader } from "./shopping-cart-header";
// import { ProductSearch } from "./storefront/product-search";

export const NavbarAdmin = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <>
      <nav className={cn("pb-1 sticky top-0 bg-white z-10 shadow-sm")}>
        <ContentWrapper className="flex justify-between items-center md:hidden flex-wrap gap-4">
          <Logo />
          <div className="ml-auto flex items-center gap-8">
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
            <li className="flex-1"></li>
            <li>
              <Link href={"/"}>
                <StoreIcon />
              </Link>
            </li>
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
        <ContentWrapper className="hidden md:block py-0">
          <div className="-ml-4 mt-1">
            <MenuItemsAdmin />
          </div>
        </ContentWrapper>
      </nav>
      <Line />
    </>
  );
};
