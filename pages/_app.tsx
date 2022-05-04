import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Layout, Progress } from '../components'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const router = useRouter()

  if (!router.isReady) {
    return <div>Loading</div> // Or any loading component
  }

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }

    const handleStop = () => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Progress isAnimating={isAnimating} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
