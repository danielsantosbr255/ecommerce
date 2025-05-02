import React from "react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor?: string;
}

export default function MetricCard({ title, value, icon, iconColor = "text-tx-primary" }: MetricCardProps) {
  return (
    <div className="bg-white shadow-xs rounded-2xl p-10">
      <div className="flex items-center space-x-8 ">
        <span className={`${iconColor} p-4 rounded-2xl text-tx-on-primary`}>{icon}</span>
        <div>
          <h3 className="text-tx-primary text-lg leading-5">{title}</h3>
          <p className="text-tx-primary text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
