import { Question } from "./TriviaGame";
import { useState } from "react";

const TriviaDisplay = ({
  question,
  score,
  setScore,
}: {
  question: Question;
  score: number;
  setScore: (score: number) => void;
}) => {
  const [display, setDisplay] = useState("front");
  const [status, setStatus] = useState("");
  const message =
    status === "correct"
      ? { text: "Correct!", style: "text-green-600" }
      : { text: "Incorrect", style: "text-red-600" };

  const toggleCardDisplay = () => {
    display === "front" ? setDisplay("back") : setDisplay("front");
  };

  const handleClick = (e: any, correctAnswer: string) => {
    const answer = e.target.innerText;
    if (answer === correctAnswer) {
      setStatus("correct");
      const nextScore = score + 1;
      setScore(nextScore);
    } else {
      setStatus("incorrect");
      setScore(0);
    }
    toggleCardDisplay();
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">{`Score: ${score}`}</h1>
      <div className="border-2 rounded-md bg-[#f1f1f3] text-base p-6 h-fit min-h-[24rem] w-[30rem] flex flex-col items-center justify-center">
        {display === "front" ? (
          <>
            <div className="flex-1 flex border-[1px] bg-white text-black rounded-t-md mb-4 w-full items-center justify-center">
              <h1 className="mt-1 p-3 pb-4 text-center">
                {question.question.text}
              </h1>
            </div>
            <div className="flex-1 h-fit grid grid-cols-2 grid-rows-2 gap-4">
              {question.shuffledAnswers?.map((a, i) => (
                <button
                  className="text-xs bg-white hover:bg-[#e4e6e6] text-black font-semibold py-4 min-h-14 w-48 px-1 rounded-md mx-auto"
                  key={i}
                  onClick={(e) => handleClick(e, question.correctAnswer)}
                >
                  {a}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex-1 flex flex-col gap-16 justify-center items-center text-center">
              <p className={`font-bold text-2xl ${message.style}`}>
                {message.text}
              </p>
              <p className="text-xl">{question.correctAnswer}</p>
              <span />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TriviaDisplay;
