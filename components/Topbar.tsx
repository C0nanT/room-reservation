"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Topnav from "./Topnav";

const Topbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex w-full justify-between bg-transparent md:bg-muted px-4 md:px-16 py-4">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Dream Room"
          width={100}
          height={100}
          className="h-10 w-10"
        />
        <div className="block md:hidden">
          <Topnav />
        </div>
        <h1 className="hidden md:block text-3xl">Dream Room</h1>
      </div>

      <div className="flex items-center gap-6">
        <Button asChild>
          {isSignedIn ? <SignOutButton /> : <SignInButton />}
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Topbar;
