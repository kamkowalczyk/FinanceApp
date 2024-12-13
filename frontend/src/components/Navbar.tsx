'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  FaMoneyCheckAlt,
  FaChartLine,
  FaFilePdf,
  FaSearch,
  FaUserCircle,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-lg fixed w-full z-20">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-extrabold text-blue-400"
        >
          <FaMoneyCheckAlt />
          <span>WealthHub</span>
        </Link>
        <div className="hidden lg:flex items-center bg-gray-700 px-4 py-2 rounded-lg w-1/3 focus-within:ring-2 focus-within:ring-blue-400">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex space-x-6 items-center">
          {[
            { href: '/', icon: <FaMoneyCheckAlt />, label: 'Home' },
            { href: '/charts', icon: <FaChartLine />, label: 'Charts' },
            { href: '/reports', icon: <FaFilePdf />, label: 'Reports' },
          ].map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center space-x-2 px-3 py-2 relative transition-all"
            >
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                {icon}
              </span>
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                {label}
              </span>
              <span className="absolute inset-0 border-b-2 border-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          ))}
        </div>
        <div>
          {!session ? (
            <Link
              href="/auth/signin"
              className="flex items-center space-x-3 bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold"
            >
              <FaUserCircle className="text-lg" />
              <span>Sign In</span>
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-3 bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold"
            >
              <FaUserCircle className="text-lg" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
