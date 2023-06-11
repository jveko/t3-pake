import { PropsWithChildren } from "react";
import { ContentWrapper } from "~/components/content-wrapper";

export default function Layout(props: PropsWithChildren) {
  return <ContentWrapper>{props.children}</ContentWrapper>;
}
