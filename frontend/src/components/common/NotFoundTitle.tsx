import React from "react";

const NotFoundTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full h-full mx-auto items-center justify-center">
      <h1 className="text-2xl font-medium my-2 py-2">{children}</h1>
    </main>
  );
};

export default NotFoundTitle;
