import Link from "next/link";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Nav = () => {
  return (
    <header className="flex justify-between items-center container mx-auto py-4 z-30 relative backdrop-filter backdrop-blur-md bg-opacity-75">
      <div className="absolute inset-0 bg-white backdrop-blur-md z-0 bg-opacity-25"></div>
      <div className="flex items-center relative z-10">
        <p className="text-xl font-bold">LOGO</p>
      </div>
      <nav>
        <ul className="flex items-center space-x-4 relative z-10">
          {navLinks.map((link) => (
            <li key={link.name} className="px-2 md:px-4">
              <Link href={link.path} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
