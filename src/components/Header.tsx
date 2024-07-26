import Link from "next/link";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Trivia", url: "/trivia" },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Contact", url: "/contact" },
  { id: 5, title: "Dashboard", url: "/dashboard" },
];

const Header = () => {
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
    </nav>
  );
};

export default Header;
