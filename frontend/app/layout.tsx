import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../src/styles/globals.css';
import ClientProvider from '../src/components/ClientProvider';
import HealthCheckMonitor from '../src/components/HealthCheckMonitor';

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FinanceApp',
  description: 'Monitor exchange rates, cryptocurrencies, and companies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg text-white`}
      >
        <ClientProvider>
          {children}
          <HealthCheckMonitor /> 
        </ClientProvider>
      </body>
    </html>
  );
}
