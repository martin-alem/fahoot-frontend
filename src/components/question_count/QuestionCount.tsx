import { PencilSquareIcon } from "@heroicons/react/24/outline";

const QuestionCount: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2 text-white sm:text-4xl">
        <PencilSquareIcon className="w-12" />
        <span className="text-4xl">1</span>
      </h1>
    </>
  );
};

export default QuestionCount;
