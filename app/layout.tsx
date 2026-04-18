import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CUI Connect',
  description: 'CUI Connect is a conversational AI platform for smart document search, team collaboration, and data-driven decision making.',
  generator: 'CUI Connect',
  icons: {
    icon: '/images/download.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
