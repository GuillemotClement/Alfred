import { ReactNode } from "react";
import PageContainer from "../_components/layout/PageContainer";
import LayoutHeader from "../_components/layout/LayoutHeader";
import { NavigationItem } from "../_schema/schema";

export default function HouseLayout({children}: {children: ReactNode}){

  const navigations: NavigationItem[] = [
    {
      id: 1,
      href: "/house",
      text: "Mes foyers"
    }
  ]

  return (
    <div className="">
      <LayoutHeader title="Foyer" rootHref="/house" navigations={navigations}/>

      <PageContainer>
        {children}
      </PageContainer>
    </div>
  )
}