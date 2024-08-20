import DeckList from "@/app/flashcards/components/DeckList";
import { getDecks } from "@/lib/get-decks";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const decks = await getDecks();
  return (
    <div className="flex-1 h-screen flex flex-col lg:flex-row justify-around lg:justify-center lg:gap-10 items-center">
      <DeckList decks={decks} />
      {children}
      <span className="w-[12rem]" />
    </div>
  );
}
