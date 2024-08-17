"use client";
import { useEffect, useState } from "react";
import FlashcardForm, { Card } from "@/app/flashcards/components/FlashcardForm";
import FlashCard from "./Flashcard";
import SaveDialog from "./SaveDialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveDeck, updateDeck } from "@/app/flashcards/actions";
import { revalidateByPath } from "@/lib/revalidate";

export type Deck = {
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
  const deckIsEmpty = deck.cards[0].front === "";

  useEffect(() => {
    if (savedDeck) {
      const currentDeck = { name: savedDeck.name, cards: savedDeck.cards };
      setDeck(currentDeck);
    } else {
      const savedDeck = localStorage.getItem("flashcards");
      if (savedDeck) {
        setDeck(JSON.parse(savedDeck));
      }
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

  const handleRemoveCard = () => {
    if (deck.cards.length === 1) {
      setDeck({ ...deck, cards: [{ front: "", back: "" }] });
    } else {
      const filteredCards = deck.cards.filter((card) => {
        return card !== currentCard;
      });
      setDeck({ ...deck, cards: filteredCards });
      setDisplayIndex((index) => (index === 0 ? 0 : index - 1));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (deckIsEmpty) {
      setDeck({ ...deck, cards: [nextCard] });
    } else {
      setDeck({ ...deck, cards: [...deck.cards, nextCard] });
      setDisplayIndex(deck.cards.length);
    }
    localStorage.setItem(
      "flashcards",
      JSON.stringify({
        ...deck,
        cards: deckIsEmpty ? [nextCard] : [...deck.cards, nextCard],
      })
    );
    setNextCard({ front: "", back: "" });

    if (savedDeck) {
      const newDeck = { ...savedDeck, cards: [...deck.cards, nextCard] };
      const { id } = await updateDeck(newDeck);
      revalidateByPath(`/flashcards/${id}`);
    }
  };

  const handleSave = async () => {
    if (!deckIsEmpty) {
      const deckData = { cards: deck.cards, name: deck.name };
      await saveDeck(deckData);
      localStorage.removeItem("flashcards");
    }
  };

  const newDeckDisplay = (
    <div className="flex flex-col h-[9rem]">
      <div className="flex w-full justify-end gap-4 self-end mb-6 pb-4 border-b-[1px] border-b-slate-300">
        <SaveDialog setDeck={setDeck} onSave={handleSave} deck={deck} />
        <Button className="text-xs p-2" onClick={handleRemoveCard}>
          Remove card
        </Button>
      </div>
      <FlashcardForm
        className="flex justify-between gap-3 w-full mb-2"
        nextCard={nextCard}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );

  const deckDisplay = (
    <div className="h-[9rem] flex flex-col justify-between w-full">
      <Popover>
        <PopoverTrigger className="self-end text-xs font-medium border-[1px] p-3 rounded-md bg-gray-50 hover:bg-slate-100">
          Add a card
        </PopoverTrigger>
        <PopoverContent className="w-full gap-4">
          <FlashcardForm
            className="flex flex-col items-center gap-3 p-5 w-full mb-2"
            nextCard={nextCard}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
          />
        </PopoverContent>
      </Popover>
      <h1 className="self-center text-4xl font-sans text-slate-600 mb-5">
        {deck.name}
      </h1>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-3 m-4">
      {savedDeck ? deckDisplay : newDeckDisplay}
      <FlashCard content={currentCard} />
      <div className="bg-white font-light border p-2 mt-2 min-w-[4rem] text-center text-sm font-mono rounded-lg">
        {deck.cards[0].front
          ? `${displayIndex + 1} / ${deck.cards.length}`
          : "0 / 0"}
      </div>
      <div className="flex gap-2 mt-2">
        <Button
          className="text-xs"
          onClick={() => handleCardChange("d")}
        >{`<`}</Button>
        <Button
          className=""
          onClick={() => handleCardChange("i")}
        >{`>`}</Button>
      </div>
    </div>
  );
};

export default FlashcardMode;
