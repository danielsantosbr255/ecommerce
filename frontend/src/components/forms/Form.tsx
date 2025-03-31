import React from "react";

export default function Form({ children, title }: any) {
    return (
        <div className="bg-black/80 text-neutral-300 flex flex-col gap-5 px-6 py-10 justify-center rounded-lg min-w-lg">
            <h1 className="font-bold text-center text-white text-3xl mb-3">{title}</h1>
            {children}
        </div>
    );
}
