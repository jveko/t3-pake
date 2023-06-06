import React from "react";
import { currentUser } from "@clerk/nextjs/app-beta";
import { ContentWrapper } from "~/components/content-wrapper";
import { Line } from "~/components/line";
import { Heading } from "~/components/ui/heading";

export default async function Admin() {
  const user = await currentUser();
  return (
    <div>
      <ContentWrapper>
        <div>
          <div className="bg-secondary py-2 md:px-6 border-b border-border">
            <ContentWrapper className="flex items-center justify-between">
              <Heading size="h2">Hi, {user?.firstName}</Heading>
              <div className="p-[1px] bg-gray-400 rounded-full"></div>
            </ContentWrapper>
          </div>
          <div>
            <ContentWrapper className="w-full py-2 flex items-center justify-between"></ContentWrapper>
          </div>
          <Line />
        </div>
      </ContentWrapper>
    </div>
  );
}
