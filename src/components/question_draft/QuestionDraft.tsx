import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";

const QuestionDraft: React.FC = () => {
  return (
    <>
      <div className="w-full flex-shrink-0">
        <div className="flex items-center justify-between">
          <p>1. True or False</p>
          <div className="flex items-center gap-2">
            <DocumentDuplicateIcon className="w-4 cursor-pointer" />
            <TrashIcon className="w-4 cursor-pointer" />
          </div>
        </div>
        <div className="w-full h-40 bg-white shadow-md flex justify-center items-center">
          <p className="text-slate-400 text-xl truncate">No title</p>
        </div>
      </div>
    </>
  );
};

export default QuestionDraft;
