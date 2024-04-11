import React, { useState } from 'react';
import Play from '../../container/play/Play';
import QuestionCount from '../../components/question_count/QuestionCount';
import Button from '../../components/button/Button';
import { QuizMode } from '../../utils/constant';
import { ArrowPathIcon, FilmIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import usePlayAudio from '../../hooks/usePlayAudio';

const Preview: React.FC = () => {
  const { audioRef, isPlaying } = usePlayAudio();
  const quiz = useSelector((state: RootState) => state.quizState.modifiedQuiz);
  const [done, setDone] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const navigate = useNavigate();
  const handleOptionSelection = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if ('checked' in e.target) {
      console.log(e.target.checked);
    }
  };

  const closePreview = () => navigate(-1);

  const previewAgain = () => {
    setDone(false);
    if (!isPlaying) {
      audioRef.current?.play();
    }
    setCurrentQuestion(0);
  };

  const handleTimeOut = () => {
    if (!quiz || !audioRef.current) return;
    if (currentQuestion === quiz.questions.length - 1) {
      setDone(true);
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <>
      {quiz && (
        <div className="w-full h-screen">
          <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-between bg-secondary-500">
            <QuestionCount currentQuestion={currentQuestion} totalQuestions={quiz.questions.length} />
            <h1 className="hidden md:block capitalize text-white text-xl">{quiz.title}</h1>
            <div>
              <Button label="Exit" type="primary" handleClick={closePreview} suffixIcon={<XMarkIcon className="w-6" />} />
            </div>
          </div>
          <div className="w-full pt-28 pb-12 px-4">
            {!done && <Play mode={QuizMode.PREVIEW} handleOptionSelection={handleOptionSelection} handleTimeOut={handleTimeOut} question={quiz.questions[currentQuestion]} />}
            {done && (
              <div className="flex h-screen justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                  <FilmIcon className="w-24 text-primary-500" />
                  <Button label="Play again" type="primary" suffixIcon={<ArrowPathIcon className="w-6" />} handleClick={previewAgain} />
                </div>
              </div>
            )}
          </div>
          <audio ref={audioRef} autoPlay src={quiz?.settings.gameMusic} loop />
        </div>
      )}
    </>
  );
};

export default Preview;
