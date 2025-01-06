'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../services/api';
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

const mockEURUSD: ExchangeRateHistory[] = [
  { date: '2025-01-01', rate: 1.0752 },
  { date: '2025-01-02', rate: 1.0795 },
  { date: '2025-01-03', rate: 1.0810 },
  { date: '2025-01-04', rate: 1.0833 },
  { date: '2025-01-05', rate: 1.0801 },
  { date: '2025-01-06', rate: 1.0776 },
  { date: '2025-01-07', rate: 1.0812 },
];

const mockGBPUSD: ExchangeRateHistory[] = [
  { date: '2025-01-01', rate: 1.2450 },
  { date: '2025-01-02', rate: 1.2512 },
  { date: '2025-01-03', rate: 1.2498 },
  { date: '2025-01-04', rate: 1.2533 },
  { date: '2025-01-05', rate: 1.2601 },
  { date: '2025-01-06', rate: 1.2587 },
  { date: '2025-01-07', rate: 1.2625 },
];


const mockUSDPLN: ExchangeRateHistory[] = [
  { date: '2025-01-01', rate: 4.2633 },
  { date: '2025-01-02', rate: 4.2651 },
  { date: '2025-01-03', rate: 4.2598 },
  { date: '2025-01-04', rate: 4.2702 },
  { date: '2025-01-05', rate: 4.2755 },
  { date: '2025-01-06', rate: 4.2811 },
  { date: '2025-01-07', rate: 4.2789 },
];

const mockUSDJPY: ExchangeRateHistory[] = [
  { date: '2025-01-01', rate: 132.15 },
  { date: '2025-01-02', rate: 131.95 },
  { date: '2025-01-03', rate: 132.44 },
  { date: '2025-01-04', rate: 132.77 },
  { date: '2025-01-05', rate: 132.03 },
  { date: '2025-01-06', rate: 133.01 },
  { date: '2025-01-07', rate: 133.55 },
];

const pairs = ['EUR/USD', 'GBP/USD', 'USD/PLN', 'USD/JPY'];

const mockDataMap: Record<string, ExchangeRateHistory[]> = {
  'EUR/USD': mockEURUSD,
  'GBP/USD': mockGBPUSD,
  'USD/PLN': mockUSDPLN,
  'USD/JPY': mockUSDJPY,
};

const Charts: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR/USD');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const useMockData = true;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        let data: ExchangeRateHistory[];

        if (useMockData) {
          console.log(`Using mock data for ${selectedCurrency} charts.`);
          data = mockDataMap[selectedCurrency] || [];
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

        const sorted = [...data].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const labels = sorted.map((item) =>
          new Date(item.date).toLocaleDateString()
        );

        const rates = sorted.map((item) =>
          parseFloat(item.rate.toFixed(4))
        );

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
        console.error(err);
        setError('Error fetching chart data.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedCurrency]);

  if (loading) {
    return <p>Loading chart...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!chartData) {
    return <p>No chart data available.</p>;
  }

  return (
    <div className="container mx-auto px-6 pt-28 pb-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-400">Exchange Rate Trends</h2>
        <p className="text-gray-400 mt-2">
          View exchange rate trends across different currency pairs.
        </p>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        {pairs.map((currency) => (
          <button
            key={currency}
            onClick={() => {
              setError(null);
              setSelectedCurrency(currency);
            }}
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
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: true,
                text: `${selectedCurrency} - Last 7 Days`,
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: function (value: any) {
                    return parseFloat(value).toFixed(4);
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
