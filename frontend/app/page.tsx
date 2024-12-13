'use client';

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Currencies from '@/components/Currencies';
import Cryptocurrencies from '@/components/Cryptocurrencies';
import CompanyInsights from '@/components/CompanyInsights';
import Reports from '@/components/Reports';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>WealthHub - Home</title>
        <meta
          name="description"
          content="Monitor current exchange rates, cryptocurrencies, and companies."
        />
      </Head>
      <Navbar />
      <main className="pt-28 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <header className="text-center py-16">
          <div className="relative inline-block">
            <h1 className="text-6xl font-extrabold text-blue-400 tracking-wide drop-shadow-lg animate-fade-in-down">
              Welcome to WealthHub
            </h1>
            <div className="absolute -top-4 -left-6 w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-600 blur-xl opacity-70 rounded-full"></div>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 blur-xl opacity-50 rounded-full"></div>
          </div>
          <p className="text-gray-300 text-lg mt-6 max-w-xl mx-auto">
            Your premier platform for tracking exchange rates, cryptocurrencies, and stock insights with real-time updates.
          </p>
        </header>
        <section className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
            <Currencies />
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
            <Cryptocurrencies />
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
            <CompanyInsights />
          </div>
        </section>
        <section className="container mx-auto px-6 py-12">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Generated Reports</h2>
            <Reports />
          </div>
        </section>
        <footer className="text-center py-6 bg-gray-900 text-gray-500">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} <span className="text-blue-400 font-semibold">WealthHub</span>. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
