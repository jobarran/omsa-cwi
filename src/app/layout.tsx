import './globals.css'
import { roboto } from '@/config/fonts'
import type { Metadata } from 'next'

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body suppressHydrationWarning={true} className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
