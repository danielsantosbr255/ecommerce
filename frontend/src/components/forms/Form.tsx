import { ReactNode } from "react";

interface FormProps {
    children: ReactNode;
    title: string;
}

export default function Form({ children, title }: FormProps) {
    return (
        <div className="bg-gray-50 shadow-md text-gray-600 flex flex-col gap-5 px-6 py-10 justify-center rounded-lg min-w-lg">
            <h1 className="font-bold text-center text-gray-600 text-3xl mb-3">{title}</h1>
            {children}
        </div>
    );
}
