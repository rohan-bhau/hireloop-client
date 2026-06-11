"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#020617] border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              hire<span className="text-blue-500">loop</span>
            </span>
          </Link>

          {/* RIGHT SIDE (Desktop) */}
          <div className="hidden md:flex items-center gap-6 ml-auto">

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="h-5 w-px bg-white/20 mx-2" />

            {/* Auth */}
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white text-sm"
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/signup"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-5"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#020617] border-t border-white/10">
          <div className="flex flex-col gap-4 mt-4">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Divider (mobile style) */}
            <div className="w-full h-px bg-white/10 my-2" />

            <Link
              href="/signin"
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/signup"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}