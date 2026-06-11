"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
   LogoGithub,
} from "@gravity-ui/icons";
import Image from "next/image";
import logo from '@/assets/images/logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* LEFT */}
                  <div className="md:col-span-2">
                    <Image src={logo} height={30} width={90} alt="logo"/>
            {/* <h2 className="text-2xl font-bold text-white">
              hire<span className="text-blue-500">loop</span>
            </h2> */}

            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">

              <div className="p-2 bg-white/5 rounded-md hover:bg-white/10 cursor-pointer transition">
                <LogoFacebook className="w-4 h-4" />
              </div>

              <div className="p-2 bg-indigo-600 text-white rounded-md cursor-pointer">
                <LogoGithub className="w-4 h-4" />
              </div>

              <div className="p-2 bg-white/5 rounded-md hover:bg-white/10 cursor-pointer transition">
                <LogoLinkedin className="w-4 h-4" />
              </div>

            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-500 mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Job discovery</Link></li>
              <li><Link href="#">Worker AI</Link></li>
              <li><Link href="#">Companies</Link></li>
              <li><Link href="#">Salary data</Link></li>
            </ul>
          </div>

          {/* NAVIGATIONS */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-500 mb-4">
              Navigations
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Help center</Link></li>
              <li><Link href="#">Career library</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-500 mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Brand Guideline</Link></li>
              <li><Link href="#">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-gray-500">
            Copyright 2026 — Hireloop
          </p>

          <div className="flex gap-3 text-gray-500">
            <Link href="#" className="hover:text-white transition">
              Terms & Policy
            </Link>
            <span>-</span>
            <Link href="#" className="hover:text-white transition">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}