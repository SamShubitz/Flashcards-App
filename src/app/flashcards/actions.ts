"use server";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";

type deckData = {
  name: string;
  cards: { front: string; back: string }[];
};

export async function saveDeck(deckData: deckData) {
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

  return deck;
}
