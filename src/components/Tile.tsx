import React, { useEffect, useState } from "react";

interface TileProps {
  value: number;
  id: string;
  state: string;
}

const getBgColor = (value: number) => {
  switch (value) {
    case 2:
      return "bg-gray-400";
    case 4:
      return "bg-gray-500";
    case 8:
      return "bg-yellow-400";
    case 16:
      return "bg-yellow-500";
    case 32:
      return "bg-orange-500";
    case 64:
      return "bg-orange-600";
    case 128:
      return "bg-red-500";
    case 256:
      return "bg-red-600";
    case 512:
      return "bg-green-500";
    case 1024:
      return "bg-green-600";
    case 2048:
      return "bg-blue-500";
    default:
      return "bg-gray-200";
  }
};

export const Tile: React.FC<TileProps> = ({ value, id, state }) => {
  const [curState, setCurState] = useState("");
  const bgColorClass = getBgColor(value);

  useEffect(() => {
    if (state) {
      setCurState(state);
      setTimeout(() => {
        setCurState("");
      }, 160);
    }
  }, [state]);

  return (
    <>
      <div
        className={`tile-${id} p-4 m-1 rounded-md size-32 flex items-center justify-center
                    ${bgColorClass} ${
          value
            ? `text-white border-slate-950 ${curState} transition-transform duration-1000 ease-in-out`
            : "border-slate-950"
        }
                `}
      >
        <p className="font-bold text-4xl ">{value > 0 ? value : ""}</p>
      </div>
      <div className="absolute left-16">{curState}</div>
    </>
  );
};
