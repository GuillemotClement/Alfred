import { ReactNode } from "react";

type FormBasicLayout = {
  children: ReactNode,
  onSubmit: () => void,
  formTitle: string,
}

export default function FormBasicLayout({children, onSubmit, formTitle}:FormBasicLayout){
  return (
    <form
      onSubmit={onSubmit}
      className="w-150 text-center mt-30 flex-col items-center"
    >
      <h2 className="font-bold text-2xl mt-4">{formTitle}</h2>
      {children}
    </form>
  );
}