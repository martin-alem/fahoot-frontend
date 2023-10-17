import { ReactNode, Ref } from 'react';
import { Events, GameExitType, GameStage, PlayStatus, QuestionType, QuizMode, QuizStatus, USER_ROLE } from './constant';
import { Socket } from 'socket.io-client';

export interface IButtonProps {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  action?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IQuizContainerProps {
  quizzes: IQuiz[];
}

export interface IShimmerProps {
  count: number;
}

export interface IQuizProps {
  quiz: IQuiz;
}

export interface IQuestionManagerProps {
  currentQuestion: IQuestion;
  questions: IQuestion[];
  handleUpdateQuizQuestion: () => void;
  handleRemoveQuizQuestion: (questionId: string) => void;
  handleDuplicateQuizQuestion: (questionId: string) => void;
  handleChangeCurrentQuestion: (question: IQuestion) => void;
}

export interface IQuestionMediaUploadProps {
  questionMediaUrl: string | null;
  handleUploadQuestionMediaUrl: (mediaUrl: string | null) => void;
}

export interface IQuestionInputProps {
  questionTitle: string;
  handleEditCurrentQuestionTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IQuestionSettingsProps {
  questionType: IPair;
  points: IPair;
  duration: IPair;
  handleQuestionSettingUpdate: (questionType: IPair | null, points: IPair | null, duration: IPair | null) => void;
}

export interface IQuestionOptionsProps {
  options: IOption[];
  handleCurrentQuestionOptionUpdate: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, optionId: string, isTextChange: boolean) => void;
}

export interface IPaginationProps {
  total: number;
  totalPages: number;
  currentNumberOfResults: number;
  page: number;
  setPage: (page: number) => void;
}
export interface ModalHandle {
  open: () => void;
  close: () => void;
}

export interface IModalProps {
  children: ReactNode;
  ref: Ref<ModalHandle>;
}

export interface IQuizSettingProps {
  cancelSetting: () => void;
  colorLabel: string;
  quizTitle: string;
  lobbyMusic: string;
  gameMusic: string;
  podiumMusic: string;
  updateSettings: (title: string, gameMusic: string, lobbyMusic: string, podiumMusic: string, colorLabel: string) => void;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  authenticationMethod: string;
  avatarUrl: string | null;
  verified: boolean;
  status: string;
  role: USER_ROLE;
}

export interface IProfileProps {
  user: AuthUser | null;
}

export interface IQuizState {
  baseQuiz: IQuiz | null;
  modifiedQuiz: IQuiz | null;
  currentQuestion: IQuestion | null;
}

export type setFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IAuth {
  user: AuthUser | null;
}

export interface IQuestionOptionProps {
  option: IOption;
  mode: QuizMode;
  handleCurrentQuestionOptionUpdate: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, optionId: string, isTextChange: boolean) => void;
}

export interface IPlayProps {
  handleOptionSelection: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, optionId: string, isTextChange: boolean) => void;
  handleTimeOut: () => void;
  question: IQuestion;
  mode: QuizMode;
}

export interface IQuestionCountProps {
  currentQuestion: number;
  totalQuestions: number;
}

export interface IQuestionProps {
  questionText: string;
}

export interface ITimerProps {
  duration: number;
  onTimeout: () => void;
}

export interface IPromptProps {
  title: string;
  description: string;
  isLoading?: boolean;
  okFunction: () => void;
  cancelFunction: () => void;
}

export interface IResetPasswordRequestPayload {
  emailAddress: string;
}

export interface IVerifyEmailPayload {
  token: string;
}

export interface IResetPasswordPayload {
  token: string;
  password: string;
}

export interface IRequestVerificationEmailPayload {
  emailAddress: string;
  subject: string;
  emailPurpose: string;
}

export interface IAlertProps {
  bgColor: string;
  iconColor: string;
  headingColor: string;
  descriptionColor: string;
  heading: string;
  description: string;
  action?: () => void;
  actionText?: string;
  actionLoading?: boolean;
}

export interface IUpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateEmailPayload {
  emailAddress: string;
}

export interface IUpdateBasicInfoPayload {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}

export interface IManualSignupPayload {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  authenticationMethod: string;
}

export interface IManualSignInPayload {
  emailAddress: string;
  password: string;
  authenticationMethod: string;
  rememberMe?: boolean;
}

export interface IGetQuizzesPayload {
  page: number;
  pageSize: number;
  sortOrder: 'asc' | 'desc';
  sortField: string;
  query: string;
}

export interface ICreateQuizPayload {
  title: string;
  questions: IQuestion[];
  settings: IQuizSetting;
}

export interface IPlay {
  _id: string;
  quiz: IQuiz;
  user: AuthUser;
  status: PlayStatus;
  isOpen: boolean;
  name: string;
  code: string;
}

export interface IPlayState {
  play: IPlay | null;
  player: IPlayer | null;
  players: IPlayer[] | null;
  currentQuestion: number;
}

export interface ILobbyProps {
  connected: boolean;
  socket: Socket | null;
  setGameStage: setFunction<GameStage>;
}

export interface IGameQuestionProps {
  connected: boolean;
  socket: Socket | null;
  setGameStage: setFunction<GameStage>;
}

export interface IWaitPeriodProps {
  connected: boolean;
  duration: number;
  setGameStage: setFunction<GameStage>;
}

export interface IResponsePendingProps {
  connected: boolean;
  duration: number;
  socket: Socket | null;
  setGameStage: setFunction<GameStage>;
}

export interface IGamePinProps {
  setGameStage: setFunction<GameStage>;
}
export interface IPlayerLobbyProps {
  connected: boolean;
  setGameStage: setFunction<GameStage>;
  setSocket: setFunction<Socket | null>;
  setConnected: setFunction<boolean>;
}

export interface IPlayerNickNameProps {
  setGameStage: setFunction<GameStage>;
}

export interface IResultProps {
  connected: boolean;
  socket: Socket | null;
  setGameStage: setFunction<GameStage>;
}

export interface ICreatePlayPayload {
  quizId: string;
}

export interface IGetPlayPayload {
  playId: string;
}

export interface IGetPlayByPinPayload {
  pin: string;
}

export interface IGetPlayerPayload {
  playId: string;
}

export interface IPlayer {
  _id: string;
  play: string;
  quiz: string;
  nickName: string;
  points: number;
}

export interface IServerError {
  message: string;
  path: string;
  method: string;
  statusCode: number;
  timeStamp: number;
}

export interface IEventData {
  event: Events;
  data: unknown;
  recipient: string | null;
  room: string | null;
  timestamp: string;
  namespace: string;
}

export interface ICreatePlayerPayload {
  playId: string;
  nickName: string;
}

export interface IGoogleOAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface IGoogleOAuthProps {
  callback: (response: IGoogleOAuthResponse) => void;
  text: IGoogleText;
}

export interface IGoogleOAuthPayload {
  credential: string;
}

export interface IUpdateQuizPayload {
  _id: string;
  status?: QuizStatus;
  title?: string;
  questions?: IQuestion[];
  settings?: IQuizSetting;
}

export interface InputProps {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  prefixIcon?: ReactNode;
  value?: string;
  capitalize?: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}

export interface IEmptyStateProps {
  icon?: ReactNode;
  heading: string;
  description: string;
  action?: () => void;
}

export interface IOption {
  _id: string;
  isCorrect: boolean;
  option: string;
  colorLabel: string;
}

export interface IPlayerProps {
  player: IPlayer;
  removePlayer?: (playerId: string) => void;
  isRemovable: boolean;
}

export interface IPair {
  value: string;
  label: string;
  ring?: string;
}

export interface IColorChooseProps {
  colors: IPair[];
  selected: IPair;
  setSelected: setFunction<IPair>;
}

export interface ISelectInputProps {
  options: IPair[];
  selected: IPair;
  setSelected: setFunction<IPair> | ((...args: IPair[]) => void);
}

export interface IBeaconPayload {
  id: string;
  room: string;
  reason: GameExitType;
}

export interface IJoinGameProps {
  setPage: setFunction<string>;
}

export interface IQuizSetting {
  _id: string;
  lobbyMusic: string;
  gameMusic: string;
  podiumMusic: string;
  colorLabel: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  questionType: QuestionType;
  options: IOption[];
  duration: number;
  points: number;
  mediaUrl: string | null;
}

export interface IQuestionDraftProps {
  question: IQuestion;
  currentQuestion: IQuestion;
  index: number;
  handleRemoveQuizQuestion: (questionId: string) => void;
  handleDuplicateQuizQuestion: (questionId: string) => void;
  handleChangeCurrentQuestion: (question: IQuestion) => void;
}

export interface IQuiz {
  _id: string;
  title: string;
  status: QuizStatus;
  questions: IQuestion[];
  settings: IQuizSetting;
  updatedAt: string;
}

export interface IQuizResult {
  results: IQuiz[];
  total: number;
  totalPages: number;
}

export interface IPlayersResult {
  results: IPlayer[];
  total: number;
  totalPages: number;
}

export interface IGoogleAccounts {
  accounts: {
    id: {
      initialize: (options: IInitializeOptions) => void;
      renderButton: (element: HTMLElement | null, options: IRenderButtonOptions) => void;
      prompt: () => void;
      revoke: (id: string, callback: () => void) => void;
    };
  };
}

export type IGoogleText = 'signin_with' | 'signup_with';

export interface IInitializeOptions {
  client_id: string;
  callback: (response: IGoogleOAuthResponse) => void;
}

interface IRenderButtonOptions {
  theme: 'outline' | 'filled' | 'filled_black' | 'filled_blue'; // You can extend this
  size: 'small' | 'medium' | 'large'; // You can extend this
  text: IGoogleText;
  width?: number;
  logo_alignment: string;
}

declare global {
  interface Window {
    google: IGoogleAccounts;
  }
}

export type ActionCreator<T> = (payload: T) => { type: string; payload: T };
