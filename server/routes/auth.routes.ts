import { Router } from "express";
import { AuthController } from "../Controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { db } from "../utils/db";

export let authRoutes = Router();

let authSerivce = new AuthService(db);
let authController = new AuthController(authSerivce);

authRoutes.post("/login", authController.login);
// authRoutes.post("/logout", authController.logout);
