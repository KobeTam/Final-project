import { UserValidationErrors } from "../models/user.model";

export class UserValidationService {
  validateUser(user: any): UserValidationErrors {
    const errors: UserValidationErrors = {};

    if (!user.nickname) {
      errors.nickname = "Nickname is required";
    } else if (user.nickname.length < 3) {
      errors.nickname = "Nickname must be at least 3 characters";
    }

    if (!user.email) {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(user.email)) {
      errors.email = "Email is invalid";
    }

    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }
  isValidEmail(email: string): boolean {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
