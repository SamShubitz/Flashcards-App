import { getUser } from "@/lib/get-user";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="border-y-[1px] bg-slate-900 flex justify-center items-center p-24 gap-9">
      <div className="" />
      <div className="flex-1 max-w-96 text-left text-white">
        <h1 className="text-4xl">Welcome</h1>
        <br />
        <p>
          {`This is a 'toy app' that allows users to save and customize flashcards decks, or play a simple trivia game.`}
        </p>
      </div>
    </main>
  );
}
