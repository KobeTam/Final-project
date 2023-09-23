import { Knex } from "knex";

export class AuthService {
  constructor(private knex: Knex) {}
  async getUser(email: string) {
    const user = (
      await this.knex.select("*").from("users").where("email", email)
    )[0];
    return user;
  }
}
