import SelectInput from '../../../components/select_input/SelectInput';
import { QuestionTypeList, TimeLimitList, PointsList } from '../../../utils/constant';
import { IPair, IQuestionSettingsProps } from '../../../utils/types';

const QuestionSettings: React.FC<IQuestionSettingsProps> = ({ questionType, points, duration, handleQuestionSettingUpdate }) => {
  const updateQuestionType = (questionType: IPair) => {
    handleQuestionSettingUpdate(questionType, null, null);
  };

  const updateQuestionPoints = (points: IPair) => {
    handleQuestionSettingUpdate(null, points, null);
  };

  const updateQuestionDuration = (duration: IPair) => {
    handleQuestionSettingUpdate(null, null, duration);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="font-bold">Question Type</h3>
        <SelectInput options={QuestionTypeList} selected={questionType} setSelected={updateQuestionType} />
      </div>

      <div className="w-full">
        <h3 className="font-bold">Time Limit</h3>
        <SelectInput options={TimeLimitList} selected={duration} setSelected={updateQuestionDuration} />
      </div>

      <div className="w-full">
        <h3 className="font-bold">Points</h3>
        <SelectInput options={PointsList} selected={points} setSelected={updateQuestionPoints} />
      </div>
    </>
  );
};

export default QuestionSettings;
