"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

import { ContentWrapper } from "../content-wrapper";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

export const SecondaryMenu = () => {
  return (
    <ContentWrapper className="py-0">
      <div className="mt-1 -ml-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/account/orders" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </ContentWrapper>
  );
};
