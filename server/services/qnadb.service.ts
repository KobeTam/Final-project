import { Knex } from "knex";
import { db } from "../utils/db";
import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";
import { FileData } from "../models/filedata.model";

export class QnaDbService {
  constructor(private knex: Knex) {}
  async insertQuestion(question: Question) {
    if (!question) {
      throw new Error("Question not existed!");
    }
    console.log("question", question);
    console.log("question.content", question.content);
    console.log("question.userId", question.userId);

    const result = await db("questions")
      .insert({
        user_id: question.userId,
        content: question.content,
        // created_at: new Date(),
        token_used: question.tokenUsed,
      })
      .returning("*");
    return result[0];
  }

  async insertAnswer(answer: Answer) {
    if (!answer) {
      throw new Error("Question not existed!");
    }
    console.log("answer", answer);
    console.log("answer.content", answer.content);
    console.log("answer.userId", answer.questionId);

    const result = await db("answers")
      .insert({
        question_id: answer.questionId,
        role: answer.role,
        content: answer.content,
        token_used: answer.tokenUsed,
        // created_at: new Date(),
      })
      .returning("*");
    return result[0];
  }

  async insertFileData(fileData: FileData) {
    if (!fileData) {
      throw new Error("File not existed!");
    }
    console.log("fileData", fileData);
    console.log("fileData.filename", fileData.filename);
    console.log("fileData.questionId", fileData.questionId);

    const result = await db("files")
      .insert({
        question_id: fileData.questionId,
        filename: fileData.filename,

        // created_at: new Date(),
      })
      .returning("*");
    return result[0];
  }
}
