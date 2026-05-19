"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/content/site-config";

const links = [
  { href: "#about", label: "About" },
  { href: "#members", label: "Members" },
  { href: "#music", label: "Music" },
  { href: "#shows", label: "Shows" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
          {siteConfig.bandName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.16em] text-zinc-300 uppercase transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-zinc-200"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="border-zinc-800 bg-zinc-950 text-zinc-100">
              <SheetHeader>
                <SheetTitle className="text-sm tracking-[0.16em] uppercase">
                  Navigate
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 px-4 pb-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm tracking-[0.12em] text-zinc-200 uppercase transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
