import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { db } from "../utils/db";
import { UserValidationService } from "../services/validation.service";
import { isLoggedIn } from "../utils/guards";
export let userRoutes = Router();

let userService = new UserService(db);
let userValidationService = new UserValidationService();
let userController = new UserController(userService, userValidationService);
userRoutes.post("/register", userController.createUser);
userRoutes.get("/user", isLoggedIn, userController.getUserById);
