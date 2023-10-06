export const APP_COMPONENT_LOG_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data sent to the server. Please contact support and try again later',
};

export const AUTH_GUARD_GET_USER_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'Your Session has expired. Please login again',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data sent to the server. Please contact support and try again later',
};

export const DASHBOARD_SEND_VERIFICATION_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'Please make sure you have an active account.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data sent to the server. Please contact support and try again later',
};

export const LIBRARY_GET_QUIZZES_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'Please make sure you have an active account or your are currently logged in.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data sent to the server. Please contact support and try again later',
};

export const LIBRARY_CREATE_QUIZ_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to create a quiz.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: "Can't create quiz. Invalid data was sent to the server. Please contact support and try again later",
};

export const LOGIN_MANUAL_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid email address or password combination',
};

export const LOGIN_GOOGLE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid email address or password combination.Please make sure you are logged in to your Google account.',
};

export const LOGOUT_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: "Can't log you out. Invalid data was sent to the server. Please contact support and try again later",
};

export const AVATAR_UPDATE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your avatar.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const AVATAR_UPLOAD_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to upload your avatar.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please contact support and try again later',
};

export const AVATAR_DELETE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to delete your avatar.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please contact support and try again later',
};

export const BASIC_INFO_UPDATE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your basic information.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const CLEAR_REMEMBER_ME_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to clear all remember me sessions.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const DELETE_ACCOUNT_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to delete your account.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const EMAIL_UPDATE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your email address.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'The email address already exists. Please use a different email address.',
};

export const PASSWORD_UPDATE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your password.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const RESET_PASSWORD_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure reset verification link has not exceeded 24 hours.',
};

export const RESET_PASSWORD_REQUEST_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure your information is correct.',
};

export const MANUAL_SIGNUP_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid user credentials were sent to the server. Please check to make sure your information is correct.',
};

export const GOOGLE_SIGNUP_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure you are logged into your google account',
};

export const VERIFY_EMAIL_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please check to make sure you have not already verified your email address.',
};

export const QUESTION_MEDIA_UPLOAD_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your email address.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. You must upload an image of not more than 10M',
};

export const QUESTION_MEDIA_DELETE_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your email address.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please contact support if this error persist',
};

export const GET_QUIZ_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your email address.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'We could not find the quiz you tried to edit. Please try again later. If this error persist, contact support.',
};

export const UPDATE_QUIZ_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to update your email address.',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'Invalid data was sent to the server. Please make sure you are submitting a valid quiz.',
};

export const CREATE_PLAY_ERROR = {
  403: 'This application is currently unauthorized to access the server at the moment. Please try again later.',
  401: 'You must be logged in to create a play',
  404: 'The resource could not be found. Please contact support or try again later.',
  429: "You're doing that too often. Please wait a few minutes and try again",
  400: 'We are unable to create a play at the moment. Please try again later.',
};
