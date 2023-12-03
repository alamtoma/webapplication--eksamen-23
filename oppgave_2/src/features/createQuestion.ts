import type { Question, QuestionType } from './types';
import { AnswerTypes } from './types';

// src: https://chat.openai.com
export const createQuestion = (questionText: string, answerType: QuestionType): Question => {
  if (!AnswerTypes.includes(answerType)) {
    throw new Error(`Invalid answer type: ${answerType}`);
  }

  return {
    questionText,
    answerType,
  };
};