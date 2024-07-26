"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import revalidate from "@/app/actions";

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
  const [disabled, setDisabled] = useState(false);

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
      <Card
        key={question.id}
        score={score}
        setScore={setScore}
        question={question}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    );
  });

  const currentCard = deck[0];

  return (
    <div className="flex flex-col items-center">
      <div>{currentCard}</div>
      <button
        className="p-4 mt-8 rounded-md text-white text-sm w-40 bg-gray-800"
        onClick={handleClick}
      >
        Next question
      </button>
    </div>
  );
};

export default Trivia;
