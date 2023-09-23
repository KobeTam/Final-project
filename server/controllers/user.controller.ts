import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserValidationService } from "../services/validation.service";
import jwt from "../utils/jwt";
import jwtSimple from "jwt-simple";

export class UserController {
  constructor(
    private userService: UserService,
    private userValidationService: UserValidationService
  ) {}

  createUser = async (req: Request, res: Response) => {
    console.log("running UserController createUser");
    console.log(req.body);

    const user = req.body;
    const errors = this.userValidationService.validateUser(user);
    console.log("errors", errors);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const createdUser = await this.userService.createUser(user);

      const payload = {
        userId: createdUser.id,
        email: createdUser.email,
        nickname: createdUser.nickname,
      };
      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      console.log("token: ", token);
      res.json({
        token: token,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: (err as Error).message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    let user = req.user;

    res.json(user);
  };
}
