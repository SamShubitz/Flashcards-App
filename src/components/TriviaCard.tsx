"use client";
import { Suspense, useEffect, useState } from "react";
import Card from "./Card";
import { Question } from "./Types";
import revalidate from "@/app/actions";

const TriviaCard = ({ questions }: { questions: Question[] }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const shuffled = questions.map((q) => {
      const nextAs = shuffleAnswers(q);
      const nextQ = { ...q, shuffledAnswers: nextAs };
      return nextQ;
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
    return <Card key={question.id} question={question} />;
  });

  const currentCard = deck[0];

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>{currentCard}</div>
      </Suspense>
      <button onClick={handleClick}>Next question</button>
    </div>
  );
};

export default TriviaCard;
