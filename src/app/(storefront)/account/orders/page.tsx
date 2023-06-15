import { currentUser } from "@clerk/nextjs/app-beta";
import { Heading } from "~/components/ui/heading";

export default async function Orders() {
  const user = await currentUser();
  return (
    <>
      <Heading size="h2">Hi, {user?.firstName}</Heading>
    </>
  );
}
