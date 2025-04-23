import { Flame, FlameKindling } from "lucide-react";

import React from "react";

export default function Logo({ className, size }: { className?: string; size?: number }) {
  return <FlameKindling className={`text-highlight-n ${className}`} size={size} />;
}
