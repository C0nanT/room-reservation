import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

const Topnav = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/">Home</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href="/individual">Individual Room</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href="/meeting">Meeting Room</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href="/events">Events Room</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <ul className="flex gap-2 justify-center">
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
