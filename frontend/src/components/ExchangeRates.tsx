'use client';

import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

interface Currency {
  id: number;
  code: string;
  name: string;
}

interface ExchangeRate {
  id: number;
  currency: Currency;
  rate: number;
  date: string;
}

const ExchangeRates: React.FC = () => {
  const { data: rates, loading, error } = useFetch<ExchangeRate[]>('/exchangerates');

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Currency</th>
            <th className="py-2 px-4 border-b">Rate</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {rates && rates.map(rate => (
            <tr key={rate.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{rate.currency.code}</td>
              <td className="py-2 px-4 border-b text-center">{rate.rate}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(rate.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRates;
