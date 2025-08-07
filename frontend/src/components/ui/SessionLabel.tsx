import React from "react";

interface Props {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SessionLabel({ label, icon, className }: Props) {
  return (
    <h2 className={`flex gap-2 items-center border-b border-lines text-xl text-tx-primary font-semibold p-2 ${className}`}>
      <span className="flex items-center justify-center text-primary">{icon}</span> {label}
    </h2>
  );
}
