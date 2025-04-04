import React from "react";

export default function Button({ children, props }: any) {
    return (
        <button
            {...props}
            className="bg-amber-500 shadow-sm flex justify-center items-center gap-4 text-white p-4 rounded-lg text-xl cursor-pointer"
        >
            {children}
        </button>
    );
}
