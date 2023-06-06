import "../../../styles/globals.css";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { ContentWrapper } from "~/components/content-wrapper";
import { Footer } from "~/components/footer";
import { Line } from "~/components/line";
import { NavbarAdmin } from "~/components/navbar-admin";
import { Heading } from "~/components/ui/heading";
import { api } from "~/lib/api/server";

export const metadata = {
  title: "OneStopShop - Online marketplace",
  description: "Online marketplace",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavbarAdmin
        isAdmin={await api.user.isAdmin.fetch({ externalId: userId ?? "" })}
      />
      <div className="h-full flex-1 mb-8">{children}</div>
      <Footer />
    </div>
  );
}
