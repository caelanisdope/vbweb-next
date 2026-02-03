'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/constants';

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 border-b border-apple-gray-200/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="container-apple">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="text-3xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              🏐
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-apple-gray-900 group-hover:text-apple-blue transition-colors">
                {APP_CONFIG.shortName}
              </span>
              <span className="text-xs text-apple-gray-600 hidden sm:block">
                {APP_CONFIG.description}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">首页</NavLink>
            <NavLink href="/players">球员</NavLink>
            <NavLink href="/matches">比赛</NavLink>
            <NavLink href="/stats">统计</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-apple-gray-600 hover:text-apple-blue transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-full text-apple-gray-700 hover:text-apple-blue hover:bg-apple-blue/10 transition-all duration-200 font-medium"
    >
      {children}
    </Link>
  );
}

export default Header;
