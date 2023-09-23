import { SummaryTextService } from "../services/summaryText.service";
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { QnaDbService } from "../services/qnadb.service";
import { chatGPT } from "../utils/runChatGPT";

export class SummaryTextController {
  constructor(
    private summaryTextService: SummaryTextService,
    private qnaDbService: QnaDbService
  ) {
    console.log("SummaryTextController with SummaryTextService init");
  }

  getOpenai = async (req: Request, res: Response) => {
    res.json({ Hello: "World" });
  };

  chat = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      console.log("inside chat data", data);
      const insertedQuestion = await this.qnaDbService.insertQuestion(data);
      console.log("insertedQuestion: ", insertedQuestion);
      const questionId = insertedQuestion.id;

      const result = await chatGPT(data.content);
      if (result && result.role) {
        const newData = {
          questionId: questionId,
          role: result.role,
          content: result.content,
          tokenUsed: 0,
        };
        const insertedAnswer = await this.qnaDbService.insertAnswer(newData);
      }

      console.log("chatCompletion: ", result);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Failed to get response" });
    }
  };
}
