import { useState, useEffect } from "react";
import axios from "axios";
import { mockExchangeRates } from "../mockData";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  useEffect(() => {
    const fetchData = async () => {
      if (useMock) {
        console.log("Using mock data");
        setData(mockExchangeRates as T);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, useMock]);

  return { data, loading, error };
};


export default useFetch;
