'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../services/api';
import { mockExchangeRateHistory, mockGBPUSDHistory } from '../mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExchangeRateHistory {
  date: string;
  rate: number;
}

const Charts: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR/USD'); 
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mockDataMap: Record<string, ExchangeRateHistory[]> = {
    'EUR/USD': mockExchangeRateHistory,
    'GBP/USD': mockGBPUSDHistory,
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const useMockData = true;
        let data: ExchangeRateHistory[];

        if (useMockData) {
          console.log(`Using mock data for ${selectedCurrency} charts.`);
          data = mockDataMap[selectedCurrency];
        } else {
          const response = await api.get<ExchangeRateHistory[]>(
            `/exchangerates/history?pair=${selectedCurrency}`
          );
          data = response.data;
        }

        if (!data || data.length === 0) {
          setError('No historical data available.');
          setLoading(false);
          return;
        }

        const labels = data.map((rate) => new Date(rate.date).toLocaleDateString());
        const rates = data.map((rate) => rate.rate);

        setChartData({
          labels,
          datasets: [
            {
              label: selectedCurrency,
              data: rates,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.2,
            },
          ],
        });
      } catch (err) {
        setError('Error fetching chart data.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCurrency]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!chartData) return <p>No chart data available.</p>;

  return (
    <div className="container mx-auto px-6 pt-28 pb-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-400">Exchange Rate Trends</h2>
        <p className="text-gray-400 mt-2">View the latest trends across different currency pairs.</p>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        {['EUR/USD', 'GBP/USD'].map((currency) => (
          <button
            key={currency}
            onClick={() => setSelectedCurrency(currency)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedCurrency === currency
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } transition-all duration-200`}
          >
            {currency}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Charts;
