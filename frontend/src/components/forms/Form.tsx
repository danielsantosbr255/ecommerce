import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
}

export default function Form({ children }: FormProps) {
  return (
    <div className="bg-gray-50 aspect-square shadow-md text-gray-600 flex flex-col gap-5 px-6 py-8 justify-center rounded-lg w-full max-w-md ">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
