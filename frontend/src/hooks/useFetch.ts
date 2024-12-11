"use client"

import { useEffect, useState } from 'react'
import api from '../services/api'

const useFetch = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(endpoint)
        setData(response.data)
      } catch (err) {
        setError('Error fetching data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}

export default useFetch
