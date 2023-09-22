import { CogIcon } from "@heroicons/react/20/solid";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CogIcon className="animate-spin h-12 w-12 text-primary-500" />
    </div>
  );
};

export default LoadingSpinner;
