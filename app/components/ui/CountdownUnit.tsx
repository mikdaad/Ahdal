import React from "react";

interface CountdownUnitProps {
  value: number;
  label: string;
}

export const CountdownUnit: React.FC<CountdownUnitProps> = ({
  value,
  label,
}) => {
  return (
    <div className="flex flex-col items-stretch">
      <div className=" text-xs lg:text-2xl font-medium self-center" aria-hidden="true">
        {value}
      </div>
      <div className="text-[0.45rem] lg:text-md font-thin">{label}</div>
    </div>
  );
};
