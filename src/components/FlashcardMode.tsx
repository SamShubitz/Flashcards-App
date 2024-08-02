"use client";
import { useEffect, useState } from "react";
import FlashcardForm, { Card } from "./FlashcardForm";
import FlashCard from "./Flashcard";
import Button from "./Button";
import { saveDeck } from "@/app/flashcards/actions";
import { revalidateByPath } from "@/lib/revalidate";

type Deck = {
  name: string;
  id?: string;
  userId?: string;
  cards: Card[];
};

const FlashcardMode = ({ savedDeck }: { savedDeck?: Deck }) => {
  const [deck, setDeck] = useState({
    name: "",
    cards: [{ front: "", back: "" }],
  });
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextCard, setNextCard] = useState({ front: "", back: "" });
  const currentCard = deck.cards[displayIndex];

  useEffect(() => {
    if (savedDeck) {
      const currentDeck = { name: savedDeck.name, cards: savedDeck.cards };
      setDeck(currentDeck);
    }
  }, [savedDeck]);

  const handleCardChange = (action: "d" | "i") => {
    let nextIndex = 0;
    if (action === "d") {
      nextIndex = displayIndex > 0 ? displayIndex - 1 : deck.cards.length - 1;
    } else if (action === "i") {
      nextIndex = (displayIndex + 1) % deck.cards.length;
    }
    setDisplayIndex(nextIndex);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setNextCard({ ...nextCard, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (deck.cards[0].front === "") {
      setDeck({ ...deck, cards: [nextCard] });
    } else {
      setDeck({ ...deck, cards: [...deck.cards, nextCard] });
      setDisplayIndex(deck.cards.length);
    }
    setNextCard({ front: "", back: "" });
  };

  const handleSave = async () => {
    const deckData = { cards: deck.cards, name: deck.name };
    await saveDeck(deckData);
    revalidateByPath("/flashcards");
  };

  return (
    <div className="flex flex-col h-[550px] items-center justify-between">
      {savedDeck ? (
        <h1 className="text-4xl text-gray-600">{deck.name}</h1>
      ) : (
        <div className="flex gap-4">
          <input
            type="text"
            className="text-3xl text-center"
            placeholder="New Deck"
            onChange={(e) => setDeck({ ...deck, name: e.target.value })}
          />
          <Button onClick={handleSave} className="p-2">
            Save deck
          </Button>
        </div>
      )}
      <FlashcardForm
        nextCard={nextCard}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
      <FlashCard content={currentCard} />
      <div className="font-light border p-2 min-w-[4rem] text-center rounded-lg">
        {deck.cards[0].front
          ? `${displayIndex + 1} / ${deck.cards.length}`
          : "0 / 0"}
      </div>
      <div className="flex gap-2">
        <Button
          className="py-2"
          onClick={() => handleCardChange("d")}
        >{`<`}</Button>
        <Button
          className="py-2"
          onClick={() => handleCardChange("i")}
        >{`>`}</Button>
      </div>
    </div>
  );
};

export default FlashcardMode;
