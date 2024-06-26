export enum ERROR_MESSAGES {
  INVALID_NAME = "Invalid name. Please use 3-24 alphanumeric characters or hyphens/underscores, no trailing space",
  INVALID_EMAIL = "Invalid email address",
  INVALID_PASSWORD = "Invalid password. It must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character (!@#$%), and be 8-64 characters long",
  PASSWORD_MISMATCH = "confirm password does not match the password",
  FAILED_LOGIN = "Invalid email or password",
  BAD_REQUEST_ERROR = "There was a problem with your credentials.",
  AUTH_ERROR = "Your token has expired. Please request a new one.",
  FORBIDDEN = "You are not allowed to make this request",
  SERVER_ERROR = "We're sorry, but something went wrong. We're working on getting it fixed",
  NETWORK_ERROR = "We're having trouble connecting to the server. Please check your internet connection and try again",
  RATE_LIMIT_ERROR = "You're doing that too often. Please wait a few minutes and try again",
  NOT_FOUND_ERROR = "The resource you're looking for could not be found",
  GENERIC = "Something went wrong. Please try again later",
  TIMEOUT_ERROR = "This operation is taking longer than expected. Please try again later",
  FETCH_ERROR = "We are having trouble talking to the server. Please try again later",
  PARSING_ERROR = "Unknown error. If this error persists, please contact support",
  INVALID_TITLE = "Invalid title. Title is required and cannot contain special characters",
}

export enum SUCCESS_MESSAGES {
  PASSWORD_RESET_SUCCESS = "Password reset was successful. You will be logged out in 5 seconds",
  BASIC_INFO_UPDATE_SUCCESS = "Your basic info update was successfully",
  AVATAR_UPLOAD_SUCCESS = "Avatar upload was successfully",
  EMAIL_UPDATE_SUCCESS = "Email was successfully updated. You will be logged out in 5 seconds",
  CLEAR_REMEMBER_ME_SUCCESS = "Successfully cleared remember me",
  ACCOUNT_DELETE_SUCCESS = "Account was successfully deleted. You will be logged out in 5 seconds",
  VERIFICATION_EMAIL_SENT_SUCCESS = "Verification email was successfully sent. Please check your email inbox for further instructions",
  EMAIL_VERIFICATION_SUCCESS = "Your account was successfully verified.",
}

export enum Events {
  ERROR = "fahoot:error", // emitted when an error is encountered
  CONNECTED = "fahoot:connected", // emitted when a user successfully connects
  DISCONNECTED = "disconnect", // emitted when a user disconnects
  PLAYER_JOINED = "fahoot:player_join", // emitted when a player joins
  LOCK_GAME = "fahoot:lock_game", // emitted when the organizer locks the game
  REMOVE_PLAYER = "fahoot:remove_player", // emitted when the organizer removes a player
  PLAYER_ANSWER = "fahoot:player_answer", // emitted when a player submits their answer
  QUESTION_TIME_OUT = "fahoot:question_timeout", // emitted when a question timeout is reached
  NEXT_QUESTION = "fahoot:next_question", // emitted when the next question is received
  START_GAME = "fahoot:start_game", // emitted when the game starts
  END_GAME = "fahoot:end_game", // emitted when the
}

export enum QuizMode {
  EDIT = "edit",
  PREVIEW = "preview",
  LIVE = "live",
}

export enum GameStage {
  GAME_SESSION = "game_play", // parent component housing all component below. Will be responsible for initiating a socket connection to the server.
  LOBBY = "lobby", // the default component that will be rendered when the organizer  directed to the GAME_PLAY component.
  RESULT = "result", // a page that will show current results after each question has been answered by all players.
  WAIT_PERIOD = "wait_period", // a page that will render for 5 seconds before the question page is rendered.
  QUESTION = "question", // a page that will be rendered when the next question is to be displayed.
  RESPONSE_PENDING = "response_pending", // a page that will be rendered when a player submits an answer but timer is not over yet.
  GAME_PIN = "game_pin", // a page that will be rendered for a player to enter a game pin.
  PLAYER_NICKNAME = "player_name", // a page that will be rendered for the player to enter their nickname.
  PLAYER_ENTRANCE = "player_entrance", // a page that will be rendered to immediately after the nickname to hold a single socket connection
}

export enum QuizState {
  PLAY = "play",
  RESULT = "result",
  DONE = "done",
}

export enum PlayStatus {
  PENDING = "pending",
  PLAYING = "playing",
  COMPLETED = "completed",
}

export enum USER_ROLE {
  CREATOR = "creator",
  PLAYER = "player",
  ADMIN = "admin",
}

export enum GameExitType {
  PLAYER_EXIT = "player_exit",
  ORGANIZER_EXIT = "organizer_exit",
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const PAGE_SIZE = 5;
export const PLAY_NAMESPACE = "fahoot_play";
export const LOGO = "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/static/fahoot_logo.svg";

export enum EmailPurpose {
  EMAIL_VERIFICATION = "email verification",
  PASSWORD_RESET = "password reset",
}

export enum QuestionType {
  BOOLEAN = "boolean",
  MCQ = "mcq",
}

export enum QuizStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export const LobbyMusicList = [
  {
    label: "Shine",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/shine.mp3",
  },

  {
    label: "Sweet Breeze",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/sweet-breeze.mp3",
  },

  {
    label: "Modern Technology",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/the-modern-technology.mp3",
  },

];

export const GameMusicList = [
  {
    label: "Ska Rainbow",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/ska.mp3",
  },
  {
    label: "Super Hero",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/superhero.mp3",
  },
  {
    label: "The Lord Is My Light",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/the-lord-is-my-light.mp3",
  },
];

export const PodiumMusicList = [
  {
    label: "Latin Jazz",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/latin-jazz-two-octaves.mp3",
  },
  {
    label: "Mumbai",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/mumbai.mp3",
  },
  {
    label: "Rio At Night",
    value: "https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/fahoot/audio/rio-at-night.mp3",
  },
];

export const QuestionTypeList = [
  { value: "boolean", label: "True or False" },
  { value: "mcq", label: "Quiz" },
];

export const TimeLimitList = [
  { value: "10", label: "10 seconds" },
  { value: "20", label: "20 seconds" },
  { value: "30", label: "30 seconds" },
  { value: "40", label: "40 seconds" },
  { value: "50", label: "50 seconds" },
  { value: "60", label: "60 seconds" },
  { value: "120", label: "120 seconds" },
  { value: "240", label: "240 seconds" },
];

export const PointsList = [
  { value: "100", label: "100 points" },
  { value: "200", label: "200 points" },
  { value: "300", label: "300 points" },
  { value: "400", label: "400 points" },
  { value: "500", label: "500 points" },
  { value: "600", label: "600 points" },
  { value: "700", label: "700 points" },
  { value: "800", label: "800 points" },
  { value: "900", label: "900 points" },
  { value: "1000", label: "1000 points" },
];
export const ColorList = [
  { label: "Pink", value: "bg-pink-500", ring: "ring-pink-500" },
  { label: "Purple", value: "bg-purple-500", ring: "ring-purple-500" },
  { label: "Blue", value: "bg-blue-500", ring: "ring-blue-500" },
  { label: "Green", value: "bg-green-500", ring: "ring-green-500" },
  { label: "Yellow", value: "bg-yellow-500", ring: "ring-yellow-500" },
  { label: "Rose", value: "bg-rose-500", ring: "ring-rose-500" },
  { label: "Orange", value: "bg-orange-500", ring: "ring-orange-500" },
  { label: "Violet", value: "bg-violet-500", ring: "ring-violet-500" },
  { label: "Indigo", value: "bg-indigo-500", ring: "ring-indigo-500" },
  { label: "Cyan", value: "bg-cyan-500", ring: "ring-cyan-500" },
  { label: "Sky", value: "bg-sky-500", ring: "ring-sky-500" },
  { label: "Teal", value: "bg-teal-500", ring: "ring-teal-500" },
  { label: "Emerald", value: "bg-emerald-500", ring: "ring-emerald-500" },
];

export const AppreciationMessages = ["Well done!", "You are a genius!", "That's Fantastic!", "Awesome!", "Brilliant!", "You're on fire!", "Exceptional!", "Keep it up!", "Outstanding!", "Superb!"];
