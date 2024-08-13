"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Deck } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeckList = ({ decks }: { decks: Deck[] }) => {
  const [selectedDeck, setSelectedDeck] = useState("");
  const router = useRouter();
  const deckList = decks.map((deck) => {
    return (
      <SelectItem key={deck.id} value={deck.id} className="text-xs">
        {deck.name}
      </SelectItem>
    );
  });

  const handleDeckSelect = (deckId: string) => {
    router.push(`/flashcards/${deckId}`);
    setSelectedDeck("");
  };

  return (
    <div className="rounded-lg border-2 border-gray-200 p-4 flex flex-col">
      <div className="h-full pt-12 p-3">
        <p className="text-gray-800 font-semibold my-2">My Decks</p>
        <Select value={selectedDeck} onValueChange={handleDeckSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a deck" />
          </SelectTrigger>
          <SelectContent>{deckList}</SelectContent>
        </Select>
        <div className="text-gray-800 font-semibold my-2">
          <Link href="/flashcards">New Deck</Link>
        </div>
      </div>
    </div>
  );
};

export default DeckList;
