"use client";
import { useEffect, useState } from "react";
import TriviaDisplay from "./TriviaDisplay";
import { revalidateByTag } from "@/lib/revalidate";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/shuffle-cards";

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
    const nextList = shuffledQuestions.slice(1);
    if (nextList.length === 0) {
      revalidateByTag("questions");
    }
    setShuffledQuestions(nextList);
  };

  const shuffleAnswers = (q: Question) => {
    const answers = [...q.incorrectAnswers, q.correctAnswer];
    const shuffledAnswers = shuffleArray(answers);
    return shuffledAnswers;
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
      <Button
        className=" bg-slate-900 text-white text-xs mt-6"
        onClick={handleClick}
      >
        Next question
      </Button>
    </div>
  );
};

export default Trivia;
