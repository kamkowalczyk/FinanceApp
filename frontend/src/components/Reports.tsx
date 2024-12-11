'use client';

import { useEffect, useState } from 'react';
import api from '../services/api';

interface Report {
  id: number;
  title: string;
  pdfUrl: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get<Report[]>('/reports');
        setReports(response.data);
      } catch (err) {
        setError('Error fetching reports.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id} className="mb-2">
            <a
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {report.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
