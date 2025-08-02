import React from "react";
import CountUp from "../CountUp";

export function StatBlock({ number, label }) {
  return (
    <div className="flex items-end gap-4" dir="rtl">
      <div className="w-[3px] h-8 bg-black" />
      <div>
        <CountUp
            from={0}
            to={number}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-3xl font-medium"
          />
        <h2>{label}</h2>
      </div>
    </div>
  );
} 