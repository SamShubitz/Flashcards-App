import { Deck } from "@prisma/client";
import Link from "next/link";

const DeckList = ({ decks }: { decks: Deck[] }) => {
  const deckList = decks.map((deck) => {
    return (
      <li key={deck.id} className="text-xs">
        <Link href={`/flashcards/${deck.id}`}>{deck.name}</Link>
      </li>
    );
  });

  return (
    <div className="h-[60rem] rounded-lg border-2 border-gray-200 p-4 flex flex-col">
      <div className="border h-full pt-12 p-3">
        <p className="text-gray-800 font-semibold my-2">My Decks</p>
        <ul className="flex flex-col gap-1">{deckList}</ul>
        <div className="text-gray-800 font-semibold my-2">
          <Link href="/flashcards">New Deck</Link>
        </div>
      </div>
    </div>
  );
};

export default DeckList;
