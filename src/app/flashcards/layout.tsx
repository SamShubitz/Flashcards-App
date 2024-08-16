import DeckList from "@/app/flashcards/components/DeckList";
import { getDecks } from "@/lib/get-decks";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const decks = await getDecks();
  return (
    <div className="border-[1px] flex-1 h-screen flex justify-center gap-10 items-center">
      <DeckList decks={decks} />
      {children}
      <span className="w-[12rem]" />
    </div>
  );
}
