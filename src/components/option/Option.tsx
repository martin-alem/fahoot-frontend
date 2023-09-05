import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type OptionProp = {
  bgColor: string;
};

const Option: React.FC<OptionProp> = ({ bgColor }) => {
  return (
    <>
      <div className={`w-full ${bgColor} text-white flex justify-between items-center gap-2 p-8 cursor-pointer shadow-lg hover:opacity-80 transition-all duration-300 ease-linear`}>
        <ExclamationCircleIcon className="w-24" />
        <h1 className="font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      </div>
    </>
  );
};

export default Option;
