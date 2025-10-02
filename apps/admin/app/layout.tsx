import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="admin-root">{children}</div>
      </body>
    </html>
  );
}
