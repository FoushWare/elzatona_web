import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Elzatona',
  description: 'Admin dashboard for managing Elzatona content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
