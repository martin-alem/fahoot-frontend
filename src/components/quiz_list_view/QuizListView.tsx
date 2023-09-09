import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../button/Button";
import { IQuizProps } from "../../utils/types";

const QuizListView: React.FC<IQuizProps> = ({ quiz }) => {
  return (
    <>
      <div className="w-full flex shadow-lg rounded-md overflow-x-auto">
        <div className={`relative w-1/5 ${quiz.bgColor}`}></div>
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
              <h3 className="w-48 font-bold capitalize truncate">Martin Alemajoh</h3>
            </div>
            <h2 className="w-48 font-bold truncate">{`Updated ${quiz.lastUpdated}`}</h2>
            <h2 className="w-48 font-bold capitalize truncate">{`${quiz.numberOfPlays} plays`}</h2>
            <div>
              <Button label="Start" type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizListView;
