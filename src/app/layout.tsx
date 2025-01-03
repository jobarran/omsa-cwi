import './globals.css'
import { roboto } from '@/config/fonts'
import type { Metadata } from 'next'
import Head from 'next/head'


export const metadata: Metadata = {
  title: 'OMSA - CWI',
  description: 'Gestion de obra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body suppressHydrationWarning={true} className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
