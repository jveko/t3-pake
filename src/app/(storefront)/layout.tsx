import { NavBar } from "~/components/storefront/navbar";

import "../../styles/globals.css";
import React from "react";
import { auth } from "@clerk/nextjs/app-beta";
import { Footer } from "~/components/footer";
import { api } from "~/lib/api/server";

export const metadata = {
  title: "OneStopShop - Online marketplace",
  description: "Online marketplace",
};

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var { userId } = auth();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar isAdmin={await api.user.isAdmin.fetch({ externalId: userId })} />
      <div className="h-full flex-1 mb-8">{children}</div>
      <Footer />
    </div>
  );
}
