import { ChatCompletionResponseMessageRoleEnum } from "openai";

export interface Answer {
  questionId: number;
  role?: ChatCompletionResponseMessageRoleEnum;
  content?: string;
  tokenUsed: number;
}
