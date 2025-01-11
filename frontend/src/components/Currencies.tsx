'use client';

import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import api from '../services/api';

interface CurrencyWithRate {
  id: number;
  code: string;
  name: string;
  rate: number | null;
}

const Currencies: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyWithRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await api.get<CurrencyWithRate[]>('/currencies/withrates');
        console.log('DEBUG /currencies/withrates:', response.data);

        setCurrencies(response.data);
      } catch (err) {
        console.error('Error fetching currencies with rates:', err);
        setError('Failed to fetch currencies with rates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-400">Loading currencies with rates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
      <div className="flex justify-center mb-6">
        <FaMoneyBillWave className="text-blue-400 text-6xl group-hover:animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-blue-300 group-hover:text-blue-400 transition">
        Currencies &amp; Rates
      </h2>
      <div className="mt-6 w-full">
        <ul className="text-gray-400 text-sm space-y-2">
          {currencies.map((c) => (
            <li
              key={c.id}
              className="bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition flex items-center justify-between"
            >
              <span>
                <strong className="text-blue-400">{c.code}</strong>{' '}
                <span className="ml-1">({c.name})</span>
              </span>
              <span className="text-blue-300 font-semibold">
              {
            c.rate !== null
              ? (c.rate / 10000).toFixed(4) + ' PLN'
              : 'N/A'
          }
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Currencies;
