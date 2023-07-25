import SessionProvider from '@/providers/session-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next with auth',
  description: 'Quick auth templates for your next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster position='bottom-right' />
        </SessionProvider>
      </body>
    </html>
  );
}
