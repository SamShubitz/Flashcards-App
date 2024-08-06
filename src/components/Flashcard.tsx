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
      className="border-2 w-[30rem]
        h-[16rem] p-4 rounded-md cursor-pointer flex items-center justify-center"
      onClick={toggleDisplay}
    >
      <p>{frontDisplay ? content.front : content.back}</p>
    </div>
  );
};

export default FlashCard;
