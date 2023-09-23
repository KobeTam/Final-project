import { Router } from "express";
import { SummaryImageService } from "../services/summaryImage.service";
import { SummaryImageController } from "../controllers/summaryImage.Controller";
import { QnaDbService } from "../services/qnadb.service";
import { db } from "../utils/db";

export let summaryImageRoutes = Router();

let summaryImageService = new SummaryImageService();
let qnaDbService = new QnaDbService(db);
let summaryImageController = new SummaryImageController(
  summaryImageService,
  qnaDbService
);

summaryImageRoutes.post(
  "/summaryImage",
  summaryImageController.summaryImageUploadImage,
  summaryImageController.summaryImageOCR,
  summaryImageController.summaryImageChatGPT
);
