import { ERROR_MESSAGES } from "./constant";

/**
 * Maps a score to a number in a sequence representing the bar's height
 * @param score score from which to calculate the bar's height
 * @returns a number representing the height of the bar
 */
export function mapScoreToBarHeight(score: number): number {
  if (score <= 0) return 10;
  if (score >= 250) return 250;
  return score;
}

export function randomColorGenerator(): string {
  const colors: string[] = [
    "bg-rose-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-emerald-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-yellow-500",
    "bg-amber-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function serverErrors(statusCode: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR"): string {
  switch (statusCode) {
    case 400:
      return ERROR_MESSAGES.REGISTRATION_ERROR;
    case 429:
      return ERROR_MESSAGES.RATE_LIMIT_ERROR;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND_ERROR;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 401:
      return ERROR_MESSAGES.AUTH_ERROR;
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    case "TIMEOUT_ERROR":
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    case "FETCH_ERROR":
      return ERROR_MESSAGES.NETWORK_ERROR;
    default:
      return ERROR_MESSAGES.GENERIC;
  }
}
