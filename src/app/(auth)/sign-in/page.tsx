import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />;
}

export const runtime = "experimental-edge";
export const revalidate = 0;
