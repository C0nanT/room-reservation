import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { links } from "./Sidenav";

const Topnav = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent>
          {links.map(({ href, label }) => (
            <>
              <MenubarItem key={label}>
                <Link href={href}>{label}</Link>
              </MenubarItem>
              <MenubarSeparator />
            </>
          ))}
          <MenubarItem>
            <ul className="flex justify-center gap-2">
              <li className="cursor-pointer">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
              </li>
              <li className="cursor-pointer">
                <Image
                  src="/whatsapp.png"
                  alt="Whatsapp"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
              </li>
              <li className="cursor-pointer">
                <Image
                  src="/youtube.png"
                  alt="Intagram"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
              </li>
            </ul>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Topnav;
