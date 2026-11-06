"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [initials, setInitials] = useState("G");

  useEffect(() => {
    const username = localStorage.getItem("authUsername");
    if (!username) return;

    const userInitials = username
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");

    if (userInitials) setInitials(userInitials);
  }, []);

  return (
    <header className="mx-auto flex h-[65px] max-w-[1270px] items-center justify-between border-b border-[#e7dfd3] px-5 sm:h-[74px] sm:px-[42px]">
      <Link
        className="flex items-center gap-[9px] text-[22px] font-semibold tracking-[-1.4px] text-[#29231e] no-underline"
        href="/"
        aria-label="Elastos library home"
      >
        <span className="relative grid size-[22px] place-items-center rounded-full border-2 border-[#29231e] before:absolute before:h-0.5 before:w-2.5 before:rotate-[-42deg] before:bg-[#29231e] before:content-['']">
          <span className="absolute h-0.5 w-2.5 rotate-[42deg] bg-[#29231e]" />
        </span>
        <span>elastos</span>
      </Link>
      <Link
        href="/login"
        className="flex size-[35px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#e6c6a3] text-[10px] font-bold tracking-[.4px] text-[#5e3c24] shadow-[inset_0_0_0_3px_#f9efdf]"
        aria-label="Open user menu"
      >
        {initials}
      </Link>
    </header>
  );
}
