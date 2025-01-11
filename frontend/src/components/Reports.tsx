'use client';

import { useEffect, useState } from 'react';
import { FaFilePdf, FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import api from '../services/api';

interface Report {
  id: number;
  title: string;
  pdfUrl: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Report[]>('/reports');
      setReports(response.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to fetch reports.');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      await api.post('/reports/generate');
      await fetchReports(); // Refresh reports after generation
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Failed to generate report.');
    } finally {
      setGenerating(false);
    }
  };

  const deleteReport = async (id: number) => {
    try {
      await api.delete(`/reports/${id}`);
      await fetchReports(); // Refresh reports after deletion
    } catch (err) {
      console.error('Error deleting report:', err);
      setError('Failed to delete report.');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="container mx-auto px-6 pt-28 pb-10">
      <div className="text-center mb-12">
        <FaFilePdf className="text-blue-400 text-6xl mx-auto mb-4" />
        <h2 className="text-4xl font-extrabold text-blue-400">Available Reports</h2>
        <p className="text-gray-400 mt-2">Browse, download, or delete the latest reports in PDF format.</p>
        <button
          onClick={generateReport}
          disabled={generating}
          className={`mt-6 flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white ${generating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
        >
          <FaPlusCircle />
          {generating ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-blue-400">Loading reports...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : reports && reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report.id}
              className="relative bg-gray-800 text-white rounded-xl shadow-md hover:shadow-2xl transition-shadow border border-gray-700"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-gray-400 mt-3">Click below to view, download, or delete this report.</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-b-xl flex items-center justify-between">
                <a
                  href={report.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200"
                >
                  <FaEye />
                  View
                </a>
                <button
                  onClick={() => deleteReport(report.id)}
                  className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No reports available.</p>
      )}
    </div>
  );
};

export default Reports;
