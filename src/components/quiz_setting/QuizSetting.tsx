/* eslint-disable react-hooks/exhaustive-deps */
import { CheckIcon, PauseCircleIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../button/Button';
import SelectInput from '../select_input/SelectInput';
import { IPair, IQuiz, IQuizSettingProps } from '../../utils/types';
import ColorChooser from '../color_chooser/ColorChooser';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { validateTitle } from '../../utils/input_validation';
import { ERROR_MESSAGES, colors, gameMusic, lobbyMusic, podiumMusic } from '../../utils/constant';
import Input from '../input/input';
import { toast } from 'react-toastify';
import { getValueFromObject } from '../../utils/util';
import { useDispatch } from 'react-redux';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import { saveQuiz } from '../../slices/quiz.slice';

const QuizSetting: React.FC<IQuizSettingProps> = ({ cancelSetting }) => {
  const quiz = useSelector((state: RootState) => state.quizState.quiz);
  const dispatch = useDispatch();

  const [colorLabel, setColorLabel] = useState<IPair>(colors[0]);

  const [quizTitle, setQuizTitle] = useState<string>('');
  const [validQuizTitle, setValidQuizTitle] = useState<boolean>(false);
  const [quizTitleError, setQuizTitleError] = useState<string | undefined>(undefined);

  const [lMusic, setLMusic] = useState<IPair>(lobbyMusic[0]);
  const [gMusic, setGMusic] = useState<IPair>(gameMusic[0]);
  const [pMusic, setPMusic] = useState<IPair>(podiumMusic[0]);

  const [currentAudio, setCurrentAudio] = useState<React.RefObject<HTMLAudioElement> | null>(null);

  const {
    audioRef: lobbyMusicAudioRef,
    togglePlayPause: lobbyMusicToggle,
    isPlaying: lobbyMusicIsPlaying,
  } = useAudioPlayer();

  const {
    audioRef: gameMusicAudioRef,
    togglePlayPause: gameMusicToggle,
    isPlaying: gameMusicIsPlaying,
  } = useAudioPlayer();

  const {
    audioRef: podiumMusicAudioRef,
    togglePlayPause: podiumMusicToggle,
    isPlaying: podiumMusicIsPlaying,
  } = useAudioPlayer();

  const handlePlay = (toggle: () => void, audioRef: React.RefObject<HTMLAudioElement>): void => {
    if (currentAudio && currentAudio !== audioRef) {
      currentAudio.current?.pause();
    }
    setCurrentAudio(audioRef);
    toggle();
  };

  const handleSaveSettings = () => {
    if (validQuizTitle && quiz) {
      const { settings } = quiz;

      const updatedSettings = {
        ...settings,
        lobbyMusic: lMusic.value,
        podiumMusic: pMusic.value,
        gameMusic: gMusic.value,
        colorLabel: colorLabel.value,
      };
      const updateQuiz: IQuiz = {
        ...quiz,
        title: quizTitle,
        settings: updatedSettings,
      };
      dispatch(saveQuiz(updateQuiz));
      cancelSetting();
    }
  };

  //stop current playing audio when a song is selected from any select input fields
  useEffect(() => {
    currentAudio?.current?.pause();
  }, [lMusic.value, gMusic.value, pMusic.value]);

  useEffect(() => {
    const result = validateTitle(quizTitle);
    !result && quizTitle
      ? setQuizTitleError(ERROR_MESSAGES.INVALID_TITLE)
      : setQuizTitleError(undefined);
    setValidQuizTitle(result);
  }, [quizTitle]);

  //Set values from the redux on component initialization and when any update happens.
  useEffect(() => {
    setQuizTitle(quiz?.title ?? '');
    setLMusic(getValueFromObject(lobbyMusic, quiz?.settings.lobbyMusic ?? lobbyMusic[0].value));
    setGMusic(getValueFromObject(gameMusic, quiz?.settings.gameMusic ?? gameMusic[0].value));
    setPMusic(getValueFromObject(podiumMusic, quiz?.settings.podiumMusic ?? podiumMusic[0].value));
    setColorLabel(getValueFromObject(colors, quiz?.settings.colorLabel ?? colors[0].value));
  }, [quiz]);

  return (
    <>
      <div className="w-full p-6">
        <h1 className="text-3xl text-secondary-500 font-bold">Quiz Setting</h1>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Input
              id="quiz_title"
              type="text"
              value={quizTitle}
              handleOnChange={(e) => setQuizTitle(e.target.value)}
              handleOnBlur={() =>
                toast.error(quizTitleError, { position: toast.POSITION.TOP_CENTER })
              }
              error={quizTitleError}
              name="quiz_title"
              placeholder="Title"
              prefixIcon={<PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
            />
          </div>
          <div className="hidden md:block w-full">
            <ColorChooser colors={colors} selected={colorLabel} setSelected={setColorLabel} />
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Lobby Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={lobbyMusic} selected={lMusic} setSelected={setLMusic} />
              </div>
              <>
                {lobbyMusicIsPlaying ? (
                  <PauseCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(lobbyMusicToggle, lobbyMusicAudioRef)}
                  />
                ) : (
                  <PlayCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(lobbyMusicToggle, lobbyMusicAudioRef)}
                  />
                )}
              </>
            </div>
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Game Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={gameMusic} selected={gMusic} setSelected={setGMusic} />
              </div>
              <>
                {gameMusicIsPlaying ? (
                  <PauseCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(gameMusicToggle, gameMusicAudioRef)}
                  />
                ) : (
                  <PlayCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(gameMusicToggle, gameMusicAudioRef)}
                  />
                )}
              </>
            </div>
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Podium Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={podiumMusic} selected={pMusic} setSelected={setPMusic} />
              </div>
              <>
                {podiumMusicIsPlaying ? (
                  <PauseCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(podiumMusicToggle, podiumMusicAudioRef)}
                  />
                ) : (
                  <PlayCircleIcon
                    className="w-12 text-primary-500 cursor-pointer"
                    onClick={() => handlePlay(podiumMusicToggle, podiumMusicAudioRef)}
                  />
                )}
              </>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            <Button
              label="Cancel"
              type="secondary"
              suffixIcon={<XMarkIcon className="w-6" />}
              handleClick={cancelSetting}
            />
            <Button
              label="Save"
              disabled={!validQuizTitle}
              type="primary"
              handleClick={handleSaveSettings}
              suffixIcon={<CheckIcon className="w-6" />}
            />
          </div>
        </form>
      </div>
      <audio ref={lobbyMusicAudioRef} src={lMusic.value} />
      <audio ref={gameMusicAudioRef} src={gMusic.value} />
      <audio ref={podiumMusicAudioRef} src={pMusic.value} />
    </>
  );
};

export default QuizSetting;
