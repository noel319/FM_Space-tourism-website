import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { confirmTabType } from '@/components/nav'

type NextPageWithMeta = NextPage & {
  pageName: string
  title?: string
}

type AppPropsWithMeta = AppProps & {
  Component: NextPageWithMeta
}

function MyApp({ Component, pageProps }: AppPropsWithMeta) {
  return (
    <Layout
      pageName={confirmTabType(Component.pageName) ? Component.pageName : 'home'}
      title={Component.title}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
export { type NextPageWithMeta }
