import FlashcardMode from "@/app/flashcards/components/FlashcardMode";
import db from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { deleteDeck } from "../actions";
import { Button } from "@/components/ui/button";

export const getDeckById = async (id: string) => {
  const deck = await db.deck.findUnique({
    where: { id: id },
    include: {
      cards: true,
    },
  });

  if (!deck) {
    throw new Error("Deck not found");
  }
  return deck;
};

const DeckDisplay = async ({ params }: { params: Params }) => {
  const { id } = params;
  const deck = await getDeckById(id);

  return (
    <div className="flex flex-col gap-5 bg-gray-100 items-center justify-between border-2 rounded-lg p-[5rem]">
      <form action={deleteDeck.bind(null, id)} className="self-end">
        <Button className="text-xs self-end bg-gray-500" type="submit">
          Delete deck
        </Button>
      </form>
      <FlashcardMode savedDeck={deck} />
    </div>
  );
};

export default DeckDisplay;
