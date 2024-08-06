import DeckList from "@/components/DeckList";
import { getDecks } from "@/lib/get-decks";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const decks = await getDecks();
  return (
    <div className="flex-1 h-screen flex justify-between items-center">
      <DeckList decks={decks} />
      {children}
      <span />
    </div>
  );
}
