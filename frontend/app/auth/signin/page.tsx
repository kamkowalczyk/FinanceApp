import { getCsrfToken } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

interface SignInProps {
  csrfToken: string
}

const SignIn: React.FC<SignInProps> = ({ csrfToken }) => {
  return (
    <>
      <Head>
        <title>FinanceApp - Sign In</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form method="post" action="/api/auth/callback/credentials" className="bg-white p-6 rounded shadow-md">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input name="username" type="text" required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input name="password" type="password" required className="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SignIn
