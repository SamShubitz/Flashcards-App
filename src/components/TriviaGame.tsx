"use client";
import { useEffect, useState } from "react";
import TriviaDisplay from "./TriviaDisplay";
import revalidate from "@/app/trivia/actions";
import Button from "./Button";

export type Question = {
  id: string;
  question: { text: string };
  incorrectAnswers: string[];
  correctAnswer: string;
  shuffledAnswers?: string[];
};

const Trivia = ({ questions }: { questions: Question[] }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = questions.map((q) => {
      const answers = shuffleAnswers(q);
      const question = { ...q, shuffledAnswers: answers };
      return question;
    });
    setShuffledQuestions(shuffled);
  }, [questions]);

  const handleClick = () => {
    const nextList = shuffledQuestions.slice(1, shuffledQuestions.length);
    if (nextList.length === 0) {
      revalidate();
    }
    setShuffledQuestions(nextList);
  };

  const shuffleAnswers = (q: Question) => {
    const answers = [...q.incorrectAnswers, q.correctAnswer];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  const deck = shuffledQuestions.map((question) => {
    return (
      <TriviaDisplay
        key={question.id}
        score={score}
        setScore={setScore}
        question={question}
      />
    );
  });

  const currentCard = deck[0];

  return (
    <div className="flex flex-col items-center">
      <div>{currentCard}</div>
      <Button className="mt-8" onClick={handleClick}>
        Next question
      </Button>
    </div>
  );
};

export default Trivia;
