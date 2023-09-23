import { Knex } from "knex";
import { User } from "../models/user.model";
import { hashPassword, checkPassword } from "../utils/hash";
import { db } from "../utils/db";

export class UserService {
  constructor(private db: Knex) {}

  async createUser(user: User) {
    console.log("running UserService createUser");
    // Check if the email already exists in the database
    const existingUser = await this.emailExists(user.email);
    console.log(existingUser);

    if (existingUser) {
      throw new Error("Email already exists");
    }
    let hashedPassword = await hashPassword(user.password.toLowerCase());
    user.password = hashedPassword;
    // const user = { username, password, email, nickname };
    const result = await db("users").insert(user).returning("*");
    return result[0];
  }

  async getUserByEmail(email: string) {
    console.log("IN - getUserByEmail");
    const result = await this.db("users").where({ email }).first();
    console.log("getUserByEmail result: ", result);
    if (result) {
      return result as User;
    } else {
      return null;
    }
  }

  async emailExists(email: string): Promise<boolean> {
    const result = await this.db<User>("users").where({ email }).first();
    console.log(result);

    return !!result;
  }
}
