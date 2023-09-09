import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../button/Button";
import { IQuizProps } from "../../utils/types";

const QuizGridView: React.FC<IQuizProps> = ({ quiz }) => {
  return (
    <>
      <div className="w-full md:w-1/3 flex flex-col shadow-lg rounded-md">
        <div className={`relative h-60 ${quiz.bgColor}`}></div>
        <div className="flex-grow space-y-16 bg-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-secondary-500 text-xl md:text-3xl font-bold capitalize">{quiz.name}</h1>
            <PencilIcon className="w-6 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-center gap-2 items-center">
              <img
                className="inline-block h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div>
              <Button label="Start" type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizGridView;
