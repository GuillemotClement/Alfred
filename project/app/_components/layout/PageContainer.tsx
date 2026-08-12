import { ReactNode } from "react";

export default function PageContainer({children}: {children: ReactNode}) {
  return <div className="container mx-auto bg-white min-h-screen flex justify-center">
    {children}
  </div>;
}