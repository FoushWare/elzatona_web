export default function TestMinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white text-gray-900">{children}</div>
      </body>
    </html>
  );
}
