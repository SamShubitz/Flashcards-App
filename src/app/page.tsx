import { getUser } from "@/lib/get-user";

export default async function Home() {
  const response = await getUser();
  const user = response?.user;

  return (
    <main className="bg-slate-900 flex justify-center items-center p-24 gap-9">
      <div className="flex-1 max-w-96 text-left text-white">
        <h1 className="text-4xl">Welcome {user && user?.username}</h1>
        <br />
        <p>
          {`This is a web app that allows users to save and customize flashcard decks or play a simple trivia game.`}
        </p>
      </div>
    </main>
  );
}
