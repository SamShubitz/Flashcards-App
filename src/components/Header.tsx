import Link from "next/link";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Trivia", url: "/trivia" },
  { id: 3, title: "Blog", url: "/blog" },
  { id: 4, title: "About", url: "/about" },
  { id: 5, title: "Contact", url: "/contact" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const Header = () => {
  return (
    <nav className="bg-secondary h-11 flex justify-end items-center">
      <ul className="flex gap-4 mr-4">
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
