import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Unas pocas palabras💕",
  description: 'Unas palabras\' para la mujer mas perfecta del mundo',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
