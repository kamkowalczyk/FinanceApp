'use client';
import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface ExchangeRateDto {
  id: number;
  rate: number;
  date: string;
  currency: {
    id: number;
    code: string;
    name: string;
  };
}

const ExchangeRates: React.FC = () => {
  const [data, setData] = useState<ExchangeRateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // /api/exchangerates -> dane z bazy (wcześniej pobrane z NBP)
        const response = await api.get<ExchangeRateDto[]>('/exchangerates');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching exchange rates:', err);
        setError('Failed to fetch exchange rates.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Exchange Rates (NBP)</h2>
      <ul className="text-gray-300">
        {data.map((rate) => (
          <li key={rate.id} className="mb-2">
            <strong>{rate.currency.code}</strong> ({rate.currency.name}) = 
            {' '}{rate.rate} on {new Date(rate.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;
