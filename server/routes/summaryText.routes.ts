import { Router } from "express";
import { isLoggedIn } from "../utils/guards";
import { SummaryTextController } from "../controllers/summaryText.controller";
import { SummaryTextService } from "../services/summaryText.service";
import { QnaDbService } from "../services/qnadb.service";
import { db } from "../utils/db";

export let summaryTextRoutes = Router();

let summaryTextService = new SummaryTextService();
let qnaDbService = new QnaDbService(db);
let summaryTextController = new SummaryTextController(
  summaryTextService,
  qnaDbService
);

summaryTextRoutes.get("/", summaryTextController.getOpenai);
summaryTextRoutes.post("/chat", summaryTextController.chat);
