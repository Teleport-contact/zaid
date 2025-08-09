import CountUp from "./countUp";

export function StatBlock({ number, label }) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col gap-2">
        <CountUp
            from={0}
            to={number}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text h2"
          />
        <h2 className="h1">{label}</h2>
      </div>
      <div className="w-[3px] h-8 lg:h-16 bg-black" />
    </div>
  );
} 