
import Charts from '@/components/Charts'
import Navbar from '@/components/Navbar'
import Head from 'next/head'

const ChartsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>FinanceApp - Charts</title>
        <meta name="description" content="View interactive financial charts." />
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">
        <Charts />
      </main>
    </>
  )
}

export default ChartsPage
