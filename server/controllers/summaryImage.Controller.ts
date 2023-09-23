import { SummaryImageService } from "../services/summaryImage.service";
import { form } from "../utils/formidable";
import { Request, Response, NextFunction } from "express";
import { tesseractOCR } from "../utils/runTesseractOCR";
import { QnaDbService } from "../services/qnadb.service";
import { chatGPTSummary } from "../utils/runChatGPT";
import * as path from "path";
import { FileData } from "../models/filedata.model";

export class SummaryImageController {
  constructor(
    private summaryImageService: SummaryImageService,
    private qnaDbService: QnaDbService
  ) {}

  summaryImageUploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    form.parse(req, (err, fields, files: any) => {
      const filepath = files.image.filepath;
      const filename = path.basename(filepath);
      console.log("files.image.filepath: ", filepath);
      console.log("files.file.name: ", filename);

      res.locals.imgPath = filepath;
      res.locals.imgName = filename;
      res.locals.userId = fields.userId;
      console.log("res.locals.userId: ", fields.userId);

      next();
    });
  };

  summaryImageOCR = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(">>>summaryImageOCR");
    // console.log("res.locals.imgPath:", res.locals.imgPath);
    const imgPath = res.locals.imgPath;
    // console.log(">>>Run Tesseract OCR");
    const text = await tesseractOCR(imgPath);
    res.locals.text = text;
    // console.log("res.locals.text:", res.locals.text);
    next();
  };

  summaryImageChatGPT = async (req: Request, res: Response) => {
    console.log(">>>summaryImageChatGPT");
    const text = res.locals.text;
    const userId = res.locals.userId;
    const filename = res.locals.imgName;

    console.log("text", text);
    console.log("userId", userId);
    console.log("filename", filename);

    const data = {
      userId: userId,
      content: text,
      tokenUsed: 0,
    };

    const insertedQuestion = await this.qnaDbService.insertQuestion(data);
    console.log("insertedQuestion: ", insertedQuestion);

    const result = await chatGPTSummary(text, "short");
    const questionId = insertedQuestion.id;
    const role = result?.role;
    const content = result?.content;
    if (result && result.role) {
      const newData = {
        questionId: questionId,
        role: result.role,
        content: result.content,
        tokenUsed: 0,
      };
      const insertedAnswer = await this.qnaDbService.insertAnswer(newData);
    }

    const fileData = {
      questionId: questionId,
      filename: filename,
    };

    const insertedFileData = await this.qnaDbService.insertFileData(fileData);

    console.log("summary: ", result?.content);

    res.json({ ocrText: text, result: result });
  };
}
