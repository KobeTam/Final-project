import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { checkPassword } from "../utils/hash";
import jwt from "../utils/jwt";
import jwtSimple from "jwt-simple";
import { log } from "console";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log("req.body: ", req.body);

      if (!email || !password) {
        throw new Error("Missing email or password");
      }

      const user = await this.authService.getUser(email);

      if (!user) {
        throw new Error("No user found");
      }
      let result = await checkPassword(password, user.password);
      if (!result) {
        throw new Error("Password mismatch");
      }
      const payload = {
        userId: user.id,
        email: user.email,
        nickname: user.nickname,
      };
      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      console.log("token: ", token);

      res.json({
        token,
        // nickname: user.nickname,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to login" });
    }
  };
}
