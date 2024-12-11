
import ExchangeRates from '@/components/ExchangeRates'
import Navbar from '@/components/Navbar'
import Head from 'next/head'


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FinanceApp - Home</title>
        <meta name="description" content="Monitor current exchange rates, cryptocurrencies, and companies." />
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Current Exchange Rates</h1>
        <ExchangeRates />
      </main>
    </>
  )
}

export default Home
