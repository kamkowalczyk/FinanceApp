import GetInsights from '@/components/GetInsights';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const GetInsightsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>FinanceApp - Get Insights</title>
        <meta
          name="description"
          content="Explore insights, trends, and tools for financial success."
        />
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">
        <GetInsights />
      </main>
    </>
  );
};

export default GetInsightsPage;
