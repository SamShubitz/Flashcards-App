import TriviaGame from "./components/TriviaGame";
import { getQuestions } from "@/lib/get-trivia";

const TriviaPage = async () => {
  const questions = await getQuestions();

  return (
    <div className="flex items-center justify-center">
      <TriviaGame questions={questions} />
    </div>
  );
};

export default TriviaPage;
