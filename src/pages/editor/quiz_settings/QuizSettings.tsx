/* eslint-disable react-hooks/exhaustive-deps */
import { PencilIcon, PauseCircleIcon, PlayCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../components/button/Button';
import ColorChooser from '../../../components/color_chooser/ColorChooser';
import Input from '../../../components/input/input';
import SelectInput from '../../../components/select_input/SelectInput';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import { ColorList, LobbyMusicList, GameMusicList, PodiumMusicList, ERROR_MESSAGES } from '../../../utils/constant';
import { validateTitle } from '../../../utils/input_validation';
import { IQuizSettingProps, IPair } from '../../../utils/types';
import { getValueFromObject } from '../../../utils/util';

const QuizSetting: React.FC<IQuizSettingProps> = memo(({ cancelSetting, quizTitle, colorLabel, lobbyMusic, gameMusic, podiumMusic, updateSettings }) => {
  const [title, setTitle] = useState<string>(quizTitle);
  const [validTitle, setValidTitle] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [title],
  );

  const handleOnBlur = useCallback(() => {
    toast.error(titleError, { position: toast.POSITION.TOP_CENTER });
  }, [titleError]);

  const memoizedQuizColorLabel = useMemo(() => getValueFromObject(ColorList, colorLabel), [colorLabel]);
  const [quizColorLabel, setQuizColorLabel] = useState<IPair>(memoizedQuizColorLabel);

  const memoizedLobbyMusic = useMemo(() => getValueFromObject(LobbyMusicList, lobbyMusic), [lobbyMusic]);
  const [lMusic, setLMusic] = useState<IPair>(memoizedLobbyMusic);

  const memoizedGameMusic = useMemo(() => getValueFromObject(GameMusicList, gameMusic), [gameMusic]);
  const [gMusic, setGMusic] = useState<IPair>(memoizedGameMusic);

  const memoizedPodiumMusic = useMemo(() => getValueFromObject(PodiumMusicList, podiumMusic), [podiumMusic]);
  const [pMusic, setPMusic] = useState<IPair>(memoizedPodiumMusic);

  const [currentAudio, setCurrentAudio] = useState<React.RefObject<HTMLAudioElement> | null>(null);

  const { audioRef: lobbyMusicAudioRef, togglePlayPause: lobbyMusicToggle, isPlaying: lobbyMusicIsPlaying } = useAudioPlayer();

  const { audioRef: gameMusicAudioRef, togglePlayPause: gameMusicToggle, isPlaying: gameMusicIsPlaying } = useAudioPlayer();

  const { audioRef: podiumMusicAudioRef, togglePlayPause: podiumMusicToggle, isPlaying: podiumMusicIsPlaying } = useAudioPlayer();

  const handlePlay = useCallback(
    (toggle: () => void, audioRef: React.RefObject<HTMLAudioElement>): void => {
      if (currentAudio && currentAudio !== audioRef) {
        currentAudio.current?.pause();
      }
      setCurrentAudio(audioRef);
      toggle();
    },
    [currentAudio, setCurrentAudio],
  );

  const handleLobbyMusicClick = useCallback(() => handlePlay(lobbyMusicToggle, lobbyMusicAudioRef), [lobbyMusicToggle, lobbyMusicAudioRef, handlePlay]);
  const handleGameMusicClick = useCallback(() => handlePlay(gameMusicToggle, gameMusicAudioRef), [gameMusicToggle, gameMusicAudioRef, handlePlay]);
  const handlePodiumMusicClick = useCallback(() => handlePlay(podiumMusicToggle, podiumMusicAudioRef), [podiumMusicToggle, podiumMusicAudioRef, handlePlay]);

  const handleSaveSettings = () => {
    if (validTitle) {
      updateSettings(title, lMusic.value, gMusic.value, pMusic.value, quizColorLabel.value);
      cancelSetting();
    }
  };

  //stop current playing audio when a song is selected from any select input fields
  useEffect(() => {
    currentAudio?.current?.pause();
  }, [lMusic.value, gMusic.value, pMusic.value]);

  useEffect(() => {
    const result = validateTitle(title);
    !result && quizTitle ? setTitleError(ERROR_MESSAGES.INVALID_TITLE) : setTitleError(undefined);
    setValidTitle(result);
  }, [title]);

  return (
    <>
      <div className="w-full p-6">
        <h1 className="text-3xl text-secondary-500 font-bold">Quiz Setting</h1>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Input
              id="quiz_title"
              type="text"
              value={title}
              handleOnChange={handleOnChange}
              handleOnBlur={handleOnBlur}
              error={titleError}
              name="quiz_title"
              placeholder="Title"
              prefixIcon={<PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
            />
          </div>
          <div className="hidden md:block w-full">
            <ColorChooser colors={ColorList} selected={quizColorLabel} setSelected={setQuizColorLabel} />
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Lobby Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={LobbyMusicList} selected={lMusic} setSelected={setLMusic} />
              </div>
              <>
                {lobbyMusicIsPlaying ? (
                  <PauseCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handleLobbyMusicClick} />
                ) : (
                  <PlayCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handleLobbyMusicClick} />
                )}
              </>
            </div>
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Game Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={GameMusicList} selected={gMusic} setSelected={setGMusic} />
              </div>
              <>
                {gameMusicIsPlaying ? (
                  <PauseCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handleGameMusicClick} />
                ) : (
                  <PlayCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handleGameMusicClick} />
                )}
              </>
            </div>
          </div>
          <div className="w-full">
            <h3 className="block text-sm font-medium leading-6 text-secondary-900">Podium Music</h3>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="w-full">
                <SelectInput options={PodiumMusicList} selected={pMusic} setSelected={setPMusic} />
              </div>
              <>
                {podiumMusicIsPlaying ? (
                  <PauseCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handlePodiumMusicClick} />
                ) : (
                  <PlayCircleIcon className="w-12 text-primary-500 cursor-pointer" onClick={handlePodiumMusicClick} />
                )}
              </>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            <Button label="Cancel" type="secondary" handleClick={cancelSetting} suffixIcon={<XMarkIcon className="w-6" />} />
            <Button label="Save" disabled={!validTitle} type="primary" handleClick={handleSaveSettings} suffixIcon={<CheckIcon className="w-6" />} />
          </div>
        </form>
      </div>
      <audio ref={lobbyMusicAudioRef} src={lMusic.value} />
      <audio ref={gameMusicAudioRef} src={gMusic.value} />
      <audio ref={podiumMusicAudioRef} src={pMusic.value} />
    </>
  );
});

export default QuizSetting;
