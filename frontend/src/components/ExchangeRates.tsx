'use client';

import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { mockExchangeRates } from "../mockData";

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
  const [data, setData] = useState(mockExchangeRates);

  useEffect(() => {

    const timer = setTimeout(() => {
      setData(mockExchangeRates);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Exchange Rates</h2>
      <ul>
        {data.map((rate, index) => (
          <li key={index}>
            {rate.date}: {rate.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;