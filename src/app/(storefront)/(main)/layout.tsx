import {NavBar} from "~/components/navbar";
import "../../../styles/globals.css";
import {Footer} from "~/components/footer";
import React from "react";
import {api} from "~/lib/api/server";
import {auth} from "@clerk/nextjs/app-beta";

export const metadata = {
  title: "OneStopShop - Online marketplace",
  description: "Online marketplace",
};

export default async function StorefrontLayout({
                                                 children,
                                               }: {
  children: React.ReactNode;
}) {
  const {userId} = auth();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar isAdmin={await api.user.isAdmin.fetch({externalId: userId ?? ""})}/>
      <div className="h-full flex-1 mb-8">{children}</div>
      <Footer/>
    </div>
  );
}
