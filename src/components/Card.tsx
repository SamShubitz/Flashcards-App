import { Question, CardDisplay } from "./Types";
import { useState } from "react";

const Card = ({ question }: { question: Question }) => {
  const [display, setDisplay] = useState<CardDisplay>("front");

  const toggleCardDisplay = () => {
    display === "front" ? setDisplay("back") : setDisplay("front");
  };

  return (
    <div className="border-2 rounded-md bg-primary border-text text-lg p-6 h-fit min-h-[24rem] w-[30rem] flex flex-col items-center justify-between">
      {display === "front" ? (
        <>
          <div className="flex-1 flex border-[1px] bg-white border-text rounded-t-md mb-4 w-full items-center justify-center">
            <h1 className="mt-1 p-3 font-medium pb-4">
              {question.question.text}
            </h1>
          </div>
          <div className="flex-1 h-fit grid grid-cols-2 grid-rows-2 gap-4">
            {question.shuffledAnswers?.map((a, i) => (
              <button key={i} onClick={toggleCardDisplay}>
                <p className="text-xs bg-white font-semibold py-4 min-h-14 w-48 px-1 border-[1px] border-text rounded-md mx-auto">
                  {a}
                </p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>{question.correctAnswer}</p>
      )}
    </div>
  );
};

export default Card;
