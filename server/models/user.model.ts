export interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
}

export interface UserValidationErrors {
  email?: string;
  nickname?: string;
  password?: string;
}
