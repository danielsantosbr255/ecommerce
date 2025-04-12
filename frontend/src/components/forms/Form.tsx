import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  title: string;
}

export default function Form({ children, title }: FormProps) {
  return (
    <div className="bg-gray-50 aspect-[4/4] shadow-md text-gray-600 flex flex-col gap-5 px-6 py-8 justify-center rounded-lg w-full max-w-md ">
      <h1 className="font-bold text-center text-gray-600 text-2xl md:text-3xl mb-4 md:mb-6">{title}</h1>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
