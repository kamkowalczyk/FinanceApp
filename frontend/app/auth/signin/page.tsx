'use client';

import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

interface SignInProps {
  csrfToken: string;
}

const SignIn: React.FC<SignInProps> = ({ csrfToken }) => {
  return (
    <>
      <Head>
        <title>WealthHub - Sign In</title>
      </Head>
      <Navbar />
      <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 relative">
          {/* Decorative Circle */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-tr from-blue-500 to-blue-600 w-24 h-24 rounded-full shadow-xl flex items-center justify-center">
            <FaUserCircle className="text-white text-6xl" />
          </div>
          <form
            method="post"
            action="/api/auth/callback/credentials"
            className="mt-14 space-y-6"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-blue-400">
                Welcome Back!
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Sign in to access your dashboard and manage your wealth.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-semibold shadow-lg"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don’t have an account?{' '}
              <a
                href="#"
                className="text-blue-400 hover:underline transition-all"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// };

export default SignIn;
