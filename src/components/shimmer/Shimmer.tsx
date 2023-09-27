import { IShimmerProps } from "../../utils/types";

const Shimmer: React.FC<IShimmerProps> = ({ count }) => {
  const shimmerItems = Array.from({ length: count }, (_, index) => index);

  return (
    <div>
      {shimmerItems.map((_, index) => (
        <div key={index} className="flex space-x-4 animate-pulse">
          <div className="flex-none w-12 h-12 bg-gray-200"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;