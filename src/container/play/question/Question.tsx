import { IQuestionProps } from '../../../utils/types';

const Question: React.FC<IQuestionProps> = ({ questionText }) => {
  return (
    <>
      <div className="p-6 shadow-md bg-white">
        <p className="text-secondary-500 text-3xl text-center capitalize">{questionText}</p>
      </div>
    </>
  );
};

export default Question;
