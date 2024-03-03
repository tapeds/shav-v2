import './globals.css';

import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import QueryProvider from '@/providers/QueryProvider';

const josefin = Josefin_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SHAV',
  description: 'Task Managment App for your needs',
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={josefin.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
