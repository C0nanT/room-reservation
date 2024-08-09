// import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/individual",
    label: "Individual Room",
  },
  {
    href: "/meeting",
    label: "Meeting Room",
  },
  {
    href: "/events",
    label: "Events Room",
  },
  {
    href: "/reservations",
    label: "Reservations",
  },
];

const Sidenav = () => {
  return (
    <aside className="hidden min-h-screen w-64 flex-col justify-between bg-muted px-2 py-24 md:flex">
      <ul className="flex flex-col items-center gap-2">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="w-full rounded p-2 text-center hover:bg-muted-foreground hover:font-bold hover:text-[#000]"
          >
            <li className="transition-transform duration-200 hover:scale-110">
              {label}
            </li>
          </Link>
        ))}
      </ul>
      <ul className="flex justify-center gap-4">
        <li className="cursor-pointer transition-transform duration-200 hover:scale-110">
          <FaInstagram
            className="h-10 w-10"
            color="#fff"
            style={{
              backgroundColor: "#FF5191",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        </li>
        <li className="cursor-pointer transition-transform duration-200 hover:scale-110">
          <FaWhatsapp
            className="h-10 w-10"
            color="#fff"
            style={{
              backgroundColor: "#25D366",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        </li>
        <li className="cursor-pointer transition-transform duration-200 hover:scale-110">
          <FaYoutube
            className="h-10 w-10"
            color="#fff"
            style={{
              backgroundColor: "#FF0000",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
