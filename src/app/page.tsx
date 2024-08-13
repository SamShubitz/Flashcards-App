import { getUser } from "@/lib/get-user";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex justify-center items-center p-24 gap-9">
      <div className="" />
      <div className="flex-1 max-w-96 text-left">
        <h1 className="text-4xl">Welcome</h1>
        <br />
        <p>
          Suporting welcome additional app text.
          <br />
          <br />
          {`This is a 'toy app' that allows users to save and customize flashcards decks, or play a simple trivia game.`}
        </p>
      </div>
    </main>
  );
}
