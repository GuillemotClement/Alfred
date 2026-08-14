import { ReactNode } from "react";
import { NavigationItem } from "../_schema/schema";
import PageContainer from "../_components/layout/PageContainer";
import LayoutHeader from "../_components/layout/LayoutHeader";

export default function WorkplaceLayout({ children }: { children: ReactNode }) {
  const navigations: NavigationItem[] = [
    {
      id: 1,
      href: "/workplace",
      text: "Travail",
    },
    {
      id: 2,
      href: "/workplace/new",
      text: "Nouveau",
    },
  ];

  return (
    <>
      <LayoutHeader
        title="Travail"
        rootHref="/workplace"
        navigations={navigations}
      />

      <PageContainer>{children}</PageContainer>
    </>
  );
}
