'use client';

import { mockExchangeRates } from '@/mockData';
import { FaMoneyBillWave } from 'react-icons/fa';

const Currencies: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
      <div className="flex justify-center mb-6">
        <FaMoneyBillWave className="text-blue-400 text-6xl group-hover:animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-blue-300 group-hover:text-blue-400 transition">
        Currencies
      </h2>
      <p className="text-gray-300 mt-4">
        Stay updated with the latest currency exchange rates in real-time.
      </p>
      <div className="mt-6 w-full">
        <ul className="text-gray-400 text-sm">
          {mockExchangeRates.map((rate, index) => (
            <li key={index} className="mb-1">
              {rate.date}: <span className="text-blue-400">{rate.rate}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Currencies;
