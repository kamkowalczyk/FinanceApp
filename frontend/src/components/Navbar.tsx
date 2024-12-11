'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          FinanceApp
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/charts" className="text-white hover:underline">
            Charts
          </Link>
          <Link href="/reports" className="text-white hover:underline">
            Reports
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="text-white hover:underline"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-white hover:underline"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
