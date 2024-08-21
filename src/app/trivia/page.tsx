import TriviaGame from "./components/TriviaGame";
import { getQuestions } from "@/lib/get-trivia";

const TriviaPage = async () => {
  const questions = await getQuestions();

  return (
    <div className="bg-slate-900 py-16 flex items-center justify-center">
      <TriviaGame questions={questions} />
    </div>
  );
};

export default TriviaPage;
