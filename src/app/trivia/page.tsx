"use server";

import TriviaCard from "@/components/TriviaCard";
import { getQuestions } from "../data/TriviaData";
import { revalidateTag } from "next/cache";

const TriviaPage = async () => {
  const questions = await getQuestions();

  return (
    <div className="mx-auto flex items-center justify-center">
      <TriviaCard questions={questions} />
    </div>
  );
};

export default TriviaPage;
