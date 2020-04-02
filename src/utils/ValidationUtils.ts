interface IUserForm {
  email: string;
  password: string;
  username: string;
}

interface IUserFormValidationOptions {
  shouldValidateUsername: boolean;
}

const MIN_USERNAME_LENGTH = 2;

export const validateUserForm = (
  fields: Partial<IUserForm>,
  options: IUserFormValidationOptions = { shouldValidateUsername: true }
): string[] => {
  const res = [];

  if (!fields.email) {
    res.push("Email is required.");
  }
  if (!fields.password) {
    res.push("Password is required.");
  }

  if (options.shouldValidateUsername) {
    if (!fields.username) {
      res.push("Username is required.");
    } else if (fields.username.length < MIN_USERNAME_LENGTH) {
      res.push(
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long`
      );
    }
  }

  return res;
};
