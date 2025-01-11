'use client';

import { useEffect, useState } from 'react';

const HealthCheckMonitor: React.FC = () => {
  const [status, setStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const response = await fetch('http://localhost:5078/health');
      if (response.ok) {
        setStatus('Healthy');
        setError(null);
      } else {
        setStatus('Unhealthy');
        const errorData = await response.json();
        setError(errorData.error || 'Unknown error');
      }
    } catch (err: any) {
      setStatus('Unhealthy');
      setError(err.message);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <p className="font-semibold">
        Backend Status: <span className={status === 'Healthy' ? 'text-green-400' : 'text-red-400'}>{status}</span>
      </p>
      {status === 'Unhealthy' && error && (
        <p className="text-sm text-red-300 mt-1">Error: {error}</p>
      )}
    </div>
  );
};

export default HealthCheckMonitor;