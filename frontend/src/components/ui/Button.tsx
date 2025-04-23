import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(className, "rounded-lg flex justify-center items-center py-2 shadow cursor-pointer")}
      {...props}
    />
  );
}
