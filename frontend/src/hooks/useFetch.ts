// import { useEffect, useState } from 'react';
// import api from '../services/api';

// function useFetch<T>(endpoint: string) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get<T>(endpoint);
//         setData(response.data);
//       } catch (err) {
//         setError('Error fetching data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint]);

//   return { data, loading, error };
// }

// export default useFetch;

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
