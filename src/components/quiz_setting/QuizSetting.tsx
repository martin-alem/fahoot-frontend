import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../button/Button";
import SelectInput from "../select_input/SelectInput";
import { IQuizSettingProps } from "../../utils/types";
import ColorChooser from "../color_chooser/ColorChooser";

const QuizSetting: React.FC<IQuizSettingProps> = ({ cancelSetting }) => {
  return (
    <>
      <div className="w-full p-6">
        <h1 className="text-3xl text-secondary-500 font-bold">Quiz Setting</h1>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-secondary-900">
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 text-secondary-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="hidden md:block w-full">
            <ColorChooser />
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Lobby Music</h3>
            <SelectInput />
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Game Music</h3>
            <SelectInput />
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Podium Music</h3>
            <SelectInput />
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            <Button label="Cancel" type="secondary" suffixIcon={<XMarkIcon className="w-6" />} handleClick={cancelSetting} />
            <Button label="Save" type="primary" suffixIcon={<CheckIcon className="w-6" />} />
          </div>
        </form>
      </div>
    </>
  );
};

export default QuizSetting;
