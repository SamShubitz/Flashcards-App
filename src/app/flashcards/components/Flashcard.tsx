"use client";
import { useState, useEffect } from "react";
import { Card } from "./FlashcardForm";

const FlashCard = ({ content }: { content: Card }) => {
  const [frontDisplay, setFrontDisplay] = useState(true);

  const toggleDisplay = () => {
    setFrontDisplay(!frontDisplay);
  };

  useEffect(() => {
    setFrontDisplay(true);
  }, [content]);

  return (
    <div
      className="border border-slate-300 w-[20rem] sm:w-[30rem] h-[12rem] sm:h-[16rem] sm:p-6 rounded-lg cursor-pointer flex items-center justify-center 
               shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white overflow-auto"
      onClick={toggleDisplay}
    >
      <p className="sm:text-center mb-2 max-h-full text-sm sm:text-lg">
        {frontDisplay ? content.front : content.back}
      </p>
    </div>
  );
};

export default FlashCard;
