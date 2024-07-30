"use client";
import { useState } from "react";
import FlashcardForm from "./FlashcardForm";
import FlashCard from "./Flashcard";
import Button from "./Button";

const FlashcardMode = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextCard, setNextCard] = useState({ front: "", back: "" });
  const [cards, setCards] = useState([{ front: "", back: "" }]);
  const currentCard = cards[displayIndex];

  const handleCardChange = () => {
    const nextIndex = (displayIndex + 1) % cards.length;
    setDisplayIndex(nextIndex);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setNextCard({ ...nextCard, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (cards[0].front === "") {
      setCards([nextCard]);
    } else {
      setCards([...cards, nextCard]);
      setDisplayIndex(cards.length);
    }
    setNextCard({ front: "", back: "" });
  };

  return (
    <div className="flex flex-col h-[550px] items-center justify-between">
      <div className="flex gap-4">
        <input
          type="text"
          className="text-3xl text-center"
          placeholder="New Deck"
        />
        <Button className="p-2">Save deck</Button>
      </div>
      <FlashcardForm
        nextCard={nextCard}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
      <FlashCard content={currentCard} />
      <Button onClick={handleCardChange}>Next question</Button>
    </div>
  );
};

export default FlashcardMode;
