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
    <div className="flex flex-col gap-5 items-center justify-between border-2 rounded-lg p-[5rem]">
      <FlashcardMode savedDeck={deck} />
      <form action={deleteDeck.bind(null, id)} className="self-end">
        <Button className="text-xs" type="submit">
          Delete deck
        </Button>
      </form>
    </div>
  );
};

export default DeckDisplay;
