'use client';

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import api from '../services/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ExchangeRateHistory {
  date: string
  rate: number
}

const Charts: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExchangeRateHistory = async () => {
      try {
        const response = await api.get<ExchangeRateHistory[]>('/exchangerates/history')
        const data = response.data

        const labels = data.map((rate: ExchangeRateHistory) => new Date(rate.date).toLocaleDateString())
        const rates = data.map((rate: ExchangeRateHistory) => rate.rate)

        setChartData({
          labels,
          datasets: [
            {
              label: 'EUR/USD',
              data: rates,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        })
      } catch (err) {
        setError('Error fetching chart data.')
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRateHistory()
  }, [])

  if (loading) return <p>Loading chart...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">EUR/USD Exchange Rate History</h2>
      {chartData && <Line data={chartData} />}
    </div>
  )
}

export default Charts
