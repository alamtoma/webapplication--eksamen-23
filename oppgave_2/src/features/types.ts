// Semi-scuffed -> to test athlete rq
export type Faker = {
    id: () => string;
}

export type AthleteProps = {
    id: string;
}

// Types etc. for questions
// src: https://chat.openai.com
export enum QuestionType {
    TEXT = "Plain text",
    RADIO_NUMBER = "Scale of 1-10",
    RADIO_EMOJI = "Emojis: good, neutral or bad",
}

export const AnswerTypes: QuestionType[] = [
    QuestionType.TEXT,
    QuestionType.RADIO_NUMBER,
    QuestionType.RADIO_EMOJI,
]

export type Question = {
    questionText: string;
    answerType: QuestionType;
}

export type QuestionFormProps = {
    onClose: () => void;
    setQuestions: (questions: Question[]) => void
    questions: Question[]
}