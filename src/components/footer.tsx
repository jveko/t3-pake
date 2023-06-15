import { ContentWrapper } from "./content-wrapper";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="p-6 text-primary-foreground bg-primary pb-12">
      <ContentWrapper className="flex items-start md:items-end justify-start md:justify-between gap-2 flex-col md:flex-row">
        <div>
          <Logo />
          <p>Unleash Cool, Embrace Savings!</p>
        </div>
        <div className="flex gap-2 items-center justify-start md:justify-end">
          <div className="flex items-start md:items-end justify-center flex-col gap-1 text-secondary text-sm">
            <p>Copyright© 2023 PAKE, All rights reserved.</p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};
