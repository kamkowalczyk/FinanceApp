'use client';

import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
import api from '../services/api';

interface Company {
  id?: number;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap?: number;
  lastUpdated?: string;
}

const CompanyInsights: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {

        const response = await api.get<Company[]>('/companies');
        setCompanies(response.data);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        setError('Failed to load companies.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-center mb-6">
        <FaChartLine className="text-green-400 text-6xl" />
      </div>
      <h2 className="text-2xl font-bold text-green-300">
        Company Insights
      </h2>
      <p className="text-gray-300 mt-4">
        Dive into the performance of top companies...
      </p>
      <div className="mt-6 w-full">
        <ul className="text-gray-400 text-sm">
          {companies.map((company) => (
            <li key={company.symbol} className="mb-1">
              <span className="text-green-300">{company.name}</span> 
              {' '}(Symbol: {company.symbol}) - 
              <span className="text-green-400"> ${company.currentPrice}</span>
              {company.marketCap && (
                <span className="ml-2 text-gray-500">
                  (Market Cap: {company.marketCap.toLocaleString()})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyInsights;
