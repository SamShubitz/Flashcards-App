"use server";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { Flashcard } from "@prisma/client";
import { redirect } from "next/navigation";

type DeckData = {
  id?: string;
  name: string;
  cards: { id?: string; front: string; back: string }[];
};

export async function saveDeck(deckData: DeckData) {
  const response = await getUser();
  const user = response?.user;

  if (!user) return { error: "Log in to save a deck" };

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
          where: { id: card.id ?? "" },
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

export async function updateCard(card: Flashcard) {
  const updatedCard = await db.flashcard.update({
    where: { id: card.id },
    data: {
      front: card.front,
      back: card.back,
    },
  });
  return updatedCard;
}

export async function deleteDeck(id: string) {
  await db.deck.delete({
    where: {
      id: id as string,
    },
  });
  redirect("/flashcards");
}
