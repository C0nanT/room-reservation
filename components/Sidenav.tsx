import Image from "next/image";
import Link from "next/link";

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
];


const Sidenav = () => {
  return (
    <aside className="h-screen w-64 bg-muted px-2 py-32 flex flex-col justify-between">
      <ul className="flex flex-col items-center gap-2">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="w-full rounded-xl p-2 text-center hover:bg-muted-foreground"
          >
            <li>{label}</li>
          </Link>
        ))}
      </ul>
      <ul className="flex gap-4 justify-center">
        <li className="cursor-pointer">
          <Image src="/instagram.png" alt="Instagram" width={24} height={24} className="h-10 w-10" />
        </li>
        <li className="cursor-pointer">
          <Image src="/whatsapp.png" alt="Whatsapp" width={24} height={24} className="h-10 w-10" />
        </li>
        <li className="cursor-pointer">
          <Image src="/youtube.png" alt="Intagram" width={24} height={24} className="h-10 w-10"/>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
