"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Sun } from "lucide-react";

const TopNav = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="fixed right-0 top-0 flex w-full justify-between bg-muted px-16 py-4">
      <div>
        <h1 className="text-2xl">Dream Room</h1>
      </div>

      <div className="flex items-center gap-6">
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
        <Sun />
      </div>
    </div>
  );
};

export default TopNav;
