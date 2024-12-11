'use client'

import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'


const ProtectedPage: React.FC = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return 
    if (!session) signIn() 
  }, [session, status])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>FinanceApp - Protected</title>
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Protected Page</h1>
        <p>Welcome, {session?.user?.name}!</p>
      </main>
    </>
  )
}

export default ProtectedPage