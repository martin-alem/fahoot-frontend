import { useEffect, useState } from "react";
import { mapScoreToBarHeight } from "../../utils/util";

type BarProp = {
  bgColor: string;
  score: number;
  status: boolean;
};

const Bar: React.FC<BarProp> = ({ bgColor, score, status }) => {
  const [height, setHeight] = useState("2px");

  useEffect(() => {
    const barHeight = mapScoreToBarHeight(score);
    setTimeout(() => {
      setHeight(barHeight.toString().concat("px"));
    }, 50);
  }, [score]);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">{score}</div>
        <div style={{ height }} className={`w-16 transition-all duration-500 ease-linear ${bgColor} mt-2`}></div>
        {status ? <div className="text-2xl text-green-500">&#10003;</div> : <div className="text-2xl text-red-500">&#10005;</div>}
      </div>
    </>
  );
};

export default Bar;
