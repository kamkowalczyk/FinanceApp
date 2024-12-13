'use client';

import React from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

const cryptocurrencies = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$35,000',
    marketCap: '700B',
    color: 'text-yellow-400',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$2,000',
    marketCap: '300B',
    color: 'text-blue-400',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: '$0.35',
    marketCap: '12B',
    color: 'text-green-400',
  },
];

const Cryptocurrencies: React.FC = () => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <FaBitcoin className="text-yellow-400 text-6xl group-hover:animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-yellow-300 group-hover:text-yellow-400 transition">
        Cryptocurrencies
      </h2>
      <p className="text-gray-300 mt-4">
        Explore the latest trends in the cryptocurrency market.
      </p>
      <ul className="mt-6 w-full space-y-4">
        {cryptocurrencies.map((crypto) => (
          <li
            key={crypto.symbol}
            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <span className={`${crypto.color} text-3xl`}>
                {crypto.symbol === 'BTC' ? <FaBitcoin /> : crypto.symbol === 'ETH' ? <FaEthereum /> : null}
              </span>
              <div>
                <p className="text-lg font-semibold">{crypto.name} ({crypto.symbol})</p>
                <p className="text-sm text-gray-400">Market Cap: {crypto.marketCap}</p>
              </div>
            </div>
            <span className="text-xl font-bold">{crypto.price}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-400 mt-6">
        Data powered by trusted crypto exchanges for accuracy.
      </p>
    </>
  );
};

export default Cryptocurrencies;
