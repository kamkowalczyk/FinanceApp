'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

interface CryptoCurrency {
  id?: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  image?: string;
  total_volume?: number;
}

const Cryptocurrencies: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoDirectly = async () => {
      try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets'
          + '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

        const response = await axios.get<CryptoCurrency[]>(url);
        setCryptos(response.data);
      } catch (err) {
        setError('Failed to load cryptos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDirectly();
  }, []);

  if (loading) return <p>Loading cryptocurrencies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
      <div className="flex justify-center mb-6">
        <FaBitcoin className="text-yellow-400 text-6xl" />
      </div>
      <h2 className="text-2xl font-bold text-yellow-300">
        Cryptocurrencies
      </h2>
      <p className="text-gray-300 mt-4">
        Top 10 coins by market cap (via CoinGecko).
      </p>
      <ul className="mt-6 w-full space-y-4">
        {cryptos.map((crypto) => (
          <li
            key={crypto.id}
            className="bg-gray-700 p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={crypto.image}
                alt={crypto.symbol}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-yellow-400 text-3xl">
                {crypto.symbol?.toUpperCase() === 'BTC' ? <FaBitcoin /> 
                 : crypto.symbol?.toUpperCase() === 'ETH' ? <FaEthereum /> 
                 : null}
              </span>
              <div>
                <p className="text-lg font-semibold">
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </p>
                <p className="text-sm text-gray-400">
                  Market Cap: ${crypto.market_cap?.toLocaleString()}
                </p>
              </div>
            </div>
            <span className="text-xl font-bold">
              ${crypto.current_price?.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-400 mt-6">
        Data from CoinGecko.
      </p>
    </div>
  );
};

export default Cryptocurrencies;
