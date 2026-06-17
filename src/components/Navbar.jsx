"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import { Menu, X } from "lucide-react";
import logo from '@/assets/images/logo.png'
import Image from "next/image";
// Importing useSession and signOut from better-auth client
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/plans" },
  ];

  // Logout Handler
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // Redirect to home page after logging out
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#020617] border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} height={30} width={90} alt="logo"/>
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

            {/* Dynamic Auth Section for Desktop */}
            {!isPending && (
              <>
                {!user ? (
                  <>
                    <Link
                      href="/auth/signin"
                      className="text-gray-300 hover:text-white text-sm transition"
                    >
                      Sign In
                    </Link>

                    <Button
                      as={Link}
                      href="/auth/signup"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-5"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    {/* Replaced isBordered with standard Tailwind border utilities */}
                      <Avatar>
        <Avatar.Image
          alt="Delayed Avatar"
          src={user.image}
        />
                        <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">{ user.name.slice(0,2).toUpperCase()}</Avatar.Fallback>
      </Avatar>

                    <Button
                      size="sm"
                      variant="flat"
                      className="text-white bg-white/10 hover:bg-white/20 text-sm font-medium"
                      onClick={handleSignOut}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </>
            )}
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

            {/* Dynamic Auth Section for Mobile */}
            {!isPending && (
              <>
                {!user ? (
                  <>
                    <Link
                      href="/auth/signin"
                      className="text-gray-300 hover:text-white text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>

                    <Button
                      as={Link}
                      href="/auth/signup"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 mt-1">
                    <div className="flex items-center gap-3">
                      {/* Replaced isBordered here as well */}
                                            <Avatar>
        <Avatar.Image
          alt="Delayed Avatar"
          src={user.image}
        />
                        <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">{ user.name.slice(0,2).toUpperCase()}</Avatar.Fallback>
      </Avatar>
                      <span className="text-sm text-gray-300 truncate max-w-[200px]">
                        {user.name || user.email}
                      </span>
                    </div>
                    <Button
                      color="danger"
                      variant="flat"
                      className="w-full text-sm font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}