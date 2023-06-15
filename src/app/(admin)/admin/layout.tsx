import "../../../styles/globals.css";
import React from "react";
import { auth } from "@clerk/nextjs/app-beta";
import { Footer } from "~/components/footer";
import { NavbarAdmin } from "~/components/navbar-admin";
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
