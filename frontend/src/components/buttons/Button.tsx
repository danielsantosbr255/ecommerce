import React from "react";

export default function Button({ children, props }: any) {
    return (
        <button
            {...props}
            className="bg-amber-600 flex justify-center items-center gap-4 text-white p-4 rounded-lg text-xl cursor-pointer"
        >
            {children}
        </button>
    );
}
