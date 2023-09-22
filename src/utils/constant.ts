export enum ERROR_MESSAGES {
  INVALID_NAME = "Invalid name. Please use 3-24 alphanumeric characters or hyphens/underscores, no trailing space",
  INVALID_EMAIL = "Invalid email address",
  INVALID_PASSWORD = "Invalid password. It must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character (!@#$%), and be 8-64 characters long",
  INVALID_SERVICE = "You must select a service your offer",
  FAILED_LOGIN = "Invalid email or password",
  REGISTRATION_ERROR = "There was a problem with your credentials. Please try again",
  AUTH_ERROR = "Your session has expired, please log in again",
  FORBIDDEN = "You are not allowed to make this request",
  SERVER_ERROR = "We're sorry, but something went wrong. We're working on getting it fixed",
  NETWORK_ERROR = "We're having trouble connecting to the server. Please check your internet connection and try again",
  RATE_LIMIT_ERROR = "You're doing that too often. Please wait a few minutes and try again",
  NOT_FOUND_ERROR = "The resource you're looking for could not be found",
  GENERIC = "Something went wrong. Please try again later",
  TIMEOUT_ERROR = "This operation is taking longer than expected. Please try again later",
}