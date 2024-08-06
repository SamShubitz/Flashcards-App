"use server";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { revalidateByPath } from "@/lib/revalidate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type DeckData = {
  id?: string;
  name: string;
  cards: { id?: string; front: string; back: string }[];
};

export async function saveDeck(deckData: DeckData) {
  const response = await getUser();
  const user = response?.user;

  if (!user) return null;

  const deck = await db.deck.create({
    data: {
      name: deckData.name,
      userId: user.id,
      cards: {
        create: deckData.cards,
      },
    },
  });
  redirect(`/flashcards/${deck.id}`);
}

export async function updateDeck(deck: DeckData) {
  const updatedDeck = await db.deck.update({
    where: { id: deck.id },
    data: {
      name: deck.name,
      cards: {
        upsert: deck.cards.map((card) => ({
          where: { id: card.id ?? "" }, // Use an empty string or a default value if id is undefined
          update: {
            front: card.front,
            back: card.back,
          },
          create: {
            front: card.front,
            back: card.back,
          },
        })),
      },
    },
    include: { cards: true },
  });
  return updatedDeck;
}
