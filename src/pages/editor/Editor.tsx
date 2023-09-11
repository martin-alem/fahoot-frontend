import { Cog6ToothIcon, PlusIcon, RocketLaunchIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./../../assets/Fahoot Logo.svg";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../components/select_input/SelectInput";
import QuestionDraft from "../../components/question_draft/QuestionDraft";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import QuizSetting from "../../components/quiz_setting/QuizSetting";

const Editor: React.FC = () => {
  useTitle("Editor");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-white shadow-md flex flex-col md:flex md:flex-row items-center justify-between p-2">
        <div className="w-full md:w-1/3 flex items-center gap-2">
          <div>
            <img className="mx-auto h-12 w-auto" src={Logo} alt="Fahoot" />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              placeholder="Untitled"
            />
          </div>
          <Cog6ToothIcon className="w-12 cursor-pointer" onClick={() => setIsOpen(true)} />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <Button label="Exit" type="primary" suffixIcon={<XMarkIcon className="w-6" />} handleClick={() => navigate("/dashboard")} />
          </div>
          <div>
            <Button label="Publish" type="secondary" suffixIcon={<RocketLaunchIcon className="w-6" />} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex md:flex-row">
        <div className="w-full md:w-1/4 md:h-screen p-4">
          <div className="flex flex-row md:flex-col gap-4 items-center md:h-full overflow-auto">
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <QuestionDraft />
            <Button label="Question" type="primary" suffixIcon={<PlusIcon className="w-6" />} />
          </div>
        </div>
        <div className="w-full h-screen bg-sky-500"></div>
        <div className="w-full md:w-1/4 md:h-screen p-4 space-y-10">
          <div className="w-full">
            <h3 className="font-bold">Question Type</h3>
            <SelectInput />
          </div>

          <div className="w-full">
            <h3 className="font-bold">Time Limit</h3>
            <SelectInput />
          </div>

          <div className="w-full">
            <h3 className="font-bold">Points</h3>
            <SelectInput />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <QuizSetting cancelSetting={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default Editor;
