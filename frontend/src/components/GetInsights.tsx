'use client';

import { useEffect, useState } from 'react';
import { FaChartLine, FaCalculator, FaNewspaper, FaCoins } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
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

interface FinancialNews {
  title: string;
  url: string;
  source: string;
}

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const GetInsights: React.FC = () => {
  const [financialNews, setFinancialNews] = useState<FinancialNews[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(true);

  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loadingCrypto, setLoadingCrypto] = useState<boolean>(true);

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Fetch mock or external financial news
    const fetchNews = async () => {
      try {
        const useMockData = true;
        if (useMockData) {
          setFinancialNews([
            { title: 'How to Save More in 2025', url: '#', source: 'WealthDaily' },
            { title: 'Investing in Foreign Currencies: Tips & Tricks', url: '#', source: 'FinanceGuru' },
            { title: 'Top Trends in Crypto for 2025', url: '#', source: 'CryptoWorld' },
          ]);
        } else {
          const response = await fetch('https://newsapi.org/v2/everything?q=finance&apiKey=YOUR_API_KEY');
          const data = await response.json();
          setFinancialNews(data.articles.map((article: any) => ({
            title: article.title,
            url: article.url,
            source: article.source.name,
          })));
        }
      } catch (error) {
        console.error('Error fetching financial news:', error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    // Fetch cryptocurrency data from CoinGecko
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1'
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      } finally {
        setLoadingCrypto(false);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    // Mock chart data for currency trends
    setChartData({
      labels: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06', '2025-01-07'],
      datasets: [
        {
          label: 'USD to PLN',
          data: [4.2633, 4.2651, 4.2598, 4.2702, 4.2755, 4.2811, 4.2789],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.2,
        },
      ],
    });
  }, []);

  return (
    <div className="container mx-auto px-6 pt-28 pb-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-blue-400">Get Insights</h2>
        <p className="text-gray-400 mt-2">
          Explore the latest trends, news, and tools to help you stay financially informed.
        </p>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-400 flex items-center space-x-2">
          <FaChartLine />
          <span>Currency Trends</span>
        </h3>
        {chartData ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-400 flex items-center space-x-2">
          <FaCoins />
          <span>Cryptocurrency Market</span>
        </h3>
        {loadingCrypto ? (
          <p className="text-gray-400">Loading cryptocurrency data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h4>
                <p className="text-sm text-gray-400 mt-2">
                  Current Price: ${crypto.current_price.toFixed(2)}
                </p>
                <p className={`text-sm mt-1 ${crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-blue-400 flex items-center space-x-2">
          <FaNewspaper />
          <span>Latest Financial News</span>
        </h3>
        {loadingNews ? (
          <p className="text-gray-400">Loading news...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialNews.map((news, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  <h4 className="text-lg font-bold hover:underline">{news.title}</h4>
                </a>
                <p className="text-sm text-gray-400 mt-2">Source: {news.source}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInsights;
