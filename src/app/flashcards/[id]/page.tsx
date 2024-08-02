import FlashcardMode from "@/components/FlashcardMode";
import db from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

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

const Deck = async ({ params }: { params: Params }) => {
  const { id } = params;
  const deck = await getDeckById(id);
  return <FlashcardMode savedDeck={deck} />;
};

export default Deck;
