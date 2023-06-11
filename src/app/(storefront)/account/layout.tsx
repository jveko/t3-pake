import { PropsWithChildren } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { ContentWrapper } from "~/components/content-wrapper";
import { Footer } from "~/components/footer";
import { Line } from "~/components/line";
import { HeadingAndSubheading } from "~/components/storefront/heading-and-subheading";
import { MenuItems } from "~/components/storefront/menu-items";
import { NavBar } from "~/components/storefront/navbar";
import { SecondaryMenu } from "~/components/storefront/secondary-menu";
import { Heading } from "~/components/ui/heading";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { singleLevelNestedRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <ContentWrapper>
      <div className="p-4 bg-gray-300 border-b border-border">
        <HeadingAndSubheading
          heading="Account"
          subheading="Manage your account"
          className="m-2"
        />
      </div>
      <Line />
      <nav className={cn("pb-1 sticky top-0 bg-white z-1 shadow-sm")}>
        <SecondaryMenu />
      </nav>
      <ContentWrapper>{children}</ContentWrapper>
    </ContentWrapper>
  );
}

// const menuItems: MenuItems = [
//   {
//     name: "Profile",
//     href: singleLevelNestedRoutes.account.profile,
//     group: "selling",
//   },
//   {
//     name: "Products",
//     href: singleLevelNestedRoutes.account.products,
//     group: "selling",
//   },
//   {
//     name: "Orders",
//     href: singleLevelNestedRoutes.account.orders,
//     group: "selling",
//   },
//   {
//     name: "Payments",
//     href: singleLevelNestedRoutes.account.payments,
//     group: "selling",
//   },
//   {
//     name: "Your purchases",
//     href: singleLevelNestedRoutes.account["your-purchases"],
//     group: "buying",
//   },
// ];
