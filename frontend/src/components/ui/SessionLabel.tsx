import React from "react";

interface Props {
  label?: string;
  icon?: React.ReactNode;
}

export default function SessionLabel({ label, icon }: Props) {
  return (
    <h2 className="flex gap-2 items-center border-b border-lines text-2xl text-tx-primary font-semibold py-2">
      <span className="flex items-center justify-center text-primary">{icon}</span> {label}
    </h2>
  );
}
