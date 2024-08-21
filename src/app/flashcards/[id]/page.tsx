import FlashcardMode from "@/app/flashcards/components/FlashcardMode";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { redirect } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getDeckById = async (id: string) => {
  const response = await getUser();
  const user = response?.user;

  const deck = await db.deck.findUnique({
    where: { id: id },
    include: {
      cards: true,
    },
  });

  if (!deck) {
    redirect("/flashcards");
  } else if (deck.userId !== user?.id) {
    redirect("/login");
  }
  return deck;
};

const DeckDisplay = async ({ params }: { params: Params }) => {
  const { id } = params;
  const deck = await getDeckById(id);

  return (
    <div className="w-5/6 max-w-[40rem] border-gray-200 border-[1px] items-center justify-between rounded-lg">
      <FlashcardMode savedDeck={deck} />
    </div>
  );
};

export default DeckDisplay;
