"use client";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton, SignedIn } from "@clerk/nextjs";

function Header() {
  return (
    <header className="flex items-center justify-between bg-[#036666] h-16 px-2 md:px-10 text-white">
      <div className="flex-1 flex items-center space-x-2">
        <Link href={"/"}>
          <h1 className="font-bold text-xl text-white">Hiretopia</h1>
        </Link>
      </div>
      <div className="px-5 flex space-x-2 items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
        <SignedOut>
          <SignInButton fallbackRedirectUrl="/job" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
