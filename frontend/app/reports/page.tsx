
import Navbar from '@/components/Navbar'
import Reports from '@/components/Reports'
import Head from 'next/head'


const ReportsPage: React.FC = () => {
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
  )
}

export default ReportsPage
