import { getUser } from "@/lib/get-user";
import { logout } from "@/lib/logout";
import Link from "next/link";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Flashcards", url: "/flashcards" },
  { id: 3, title: "Trivia", url: "/trivia" },
];

const Header = async () => {
  const response = await getUser();
  let user;
  if (response) {
    user = response;
  }

  return (
    <nav className="bg-gray-800 h-11 flex text-sm justify-end items-center">
      <ul className="flex gap-4 mr-4 max-w-[1200px] self-center">
        {links.map((link) => {
          return (
            <Link className="text-white" key={link.id} href={link.url}>
              {link.title}
            </Link>
          );
        })}
      </ul>
      {user ? (
        <form action={logout}>
          <button className="text-white mr-4" type="submit">
            Log out
          </button>
        </form>
      ) : (
        <>
          <Link href="/login" className="text-white">
            Log in
          </Link>
          <Link href="/signup">
            <button className="border font-semibold px-2 py-1 rounded-xl mr-4 ml-4 text-xs text-white">
              Sign up
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
