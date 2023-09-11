import { CheckIcon } from "@heroicons/react/24/outline";

type OptionProp = {
  bgColor: string;
};

const QuestionOption: React.FC<OptionProp> = ({ bgColor }) => {
  return (
    <>
      <div className={`w-full ${bgColor} text-white flex flex-col md:flex-row justify-between items-center gap-2 p-8 cursor-pointer shadow-lg hover:opacity-80 transition-all duration-300 ease-linear`}>
        <div className="w-16 h-16 flex-shrink-0 rounded-full bg-white flex items-center justify-center">
          <CheckIcon className="w-12 text-secondary-500" />
        </div>
        <h1 className="font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      </div>
    </>
  );
};

export default QuestionOption;
