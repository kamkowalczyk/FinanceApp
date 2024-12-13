'use client';

import { mockCompanies } from '@/mockData';
import { FaChartLine } from 'react-icons/fa';

const CompanyInsights: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 group flex flex-col items-center text-center">
      <div className="flex justify-center mb-6">
        <FaChartLine className="text-green-400 text-6xl group-hover:animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-green-300 group-hover:text-green-400 transition">
        Company Insights
      </h2>
      <p className="text-gray-300 mt-4">
        Dive into the performance of top companies in the stock market.
      </p>
      <div className="mt-6 w-full">
        <ul className="text-gray-400 text-sm">
          {mockCompanies.map((company) => (
            <li key={company.symbol} className="mb-1">
              <span className="text-green-300">{company.name}</span> (Symbol: {company.symbol}) - 
              <span className="text-green-400"> ${company.currentPrice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyInsights;
