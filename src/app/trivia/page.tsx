import Trivia from "@/components/Trivia";
import { getQuestions } from "../data/TriviaData";
import { Suspense } from "react";

const TriviaPage = async () => {
  const questions = await getQuestions();

  return (
    <div className="mx-auto flex items-center justify-center">
      {/* <Suspense fallback={<Loading/>}> */}
      <Trivia questions={questions} />
      {/* </Suspense> */}
    </div>
  );
};

export default TriviaPage;
