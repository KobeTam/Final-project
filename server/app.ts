import dotenv from "dotenv";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { print } from "listening-on";
import path from "path";

import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/users.routes";
import { summaryTextRoutes } from "./routes/summaryText.routes";
import { summaryImageRoutes } from "./routes/summaryImage.routes";

import { isLoggedIn } from "./utils/guards";
// import form from "./utils/formidable";

import { User } from "./models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password">;
    }
  }
}
dotenv.config();
export const app = express();

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if ("statusCode" in error) {
    res.status(error.statusCode);
  } else {
    res.status(500);
  }
  res.json({ error: String(error).replace("Error: ", "") });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);
app.use(userRoutes);
app.use(summaryTextRoutes);
app.use(summaryImageRoutes);

app.use(express.static("public"));
app.use(express.static("uploads"));

app.use((req: Request, res: Response) => {
  res.status(404);
  res.sendFile(path.resolve("public", "404.html"));
});
const port = 8080;
app.listen(port, () => print(port));
