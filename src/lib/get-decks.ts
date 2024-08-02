import db from "@/lib/db";
import { getUser } from "@/lib/get-user";

export async function getDecks() {
  const response = await getUser();
  const user = response?.user;

  if (!user) {
    return [];
  }

  const userDecks = await db.deck.findMany({
    where: { userId: user?.id },
  });
  return userDecks;
}
