export type Question = {
  id: string;
  question: { text: string };
  incorrectAnswers: string[];
  correctAnswer: string;
  shuffledAnswers?: string[];
};

export type CardDisplay = "front" | "back";
