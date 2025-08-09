"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* لوگو یا عنوان */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            <Link href="/">MySite</Link>
          </div>

          {/* دکمه همبرگر موبایل */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* لینک‌ها و دکمه لاگین */}
          <div
            className={`flex-col md:flex-row md:flex md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            } md:translate-y-0`}
          >
            {/* میتونی لینک‌های دیگه اینجا اضافه کنی */}
            <Link
              href="/auth/login"
              className="block px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded md:inline-block"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
