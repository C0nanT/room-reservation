"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const TopNav = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex w-full justify-between bg-muted px-16 py-4">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Dream Room" width={100} height={100} className="h-10 w-10" />
        <h1 className="text-3xl">Dream Room</h1>
      </div>

      <div className="flex items-center gap-6">
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopNav;
