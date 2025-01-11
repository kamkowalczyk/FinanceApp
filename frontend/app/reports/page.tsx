import Head from 'next/head';
import Navbar from '../../src/components/Navbar';
import Reports from '../../src/components/Reports';

export default function ReportsPage() {
  return (
    <>
      <Head>
        <title>FinanceApp - Reports</title>
        <meta name="description" content="Download financial reports in PDF format." />
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">
        <Reports />
      </main>
    </>
  );
}