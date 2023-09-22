export function validateName(name: string): boolean {
  const NAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]{1,62}[A-Za-z0-9-_]$/;
  return NAME_REGEX.test(name);
}

export function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password: string): boolean {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,64}$/;
  return PWD_REGEX.test(password);
}
