import React from "react";
import CountUp from "../CountUp";

export function StatBlock({ number, label }) {
  return (
    <div className="flex items-end gap-4">
      <div className="w-[3px] h-8 md:h-16 bg-black" />
      <div className="flex flex-col gap-2">
        <div>
          <span className="text-3xl md:text-6xl font-medium">+</span>
          <CountUp
              from={0}
              to={number}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-3xl md:text-6xl font-medium"
            />
        </div>
        <h2 className="md:text-2xl">{label}</h2>
      </div>
    </div>
  );
} 