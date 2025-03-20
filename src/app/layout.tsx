import type { Metadata } from 'next';
import '../components/Layout/globals.css';

export const metadata: Metadata = {
  title: 'Verkefni 4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
