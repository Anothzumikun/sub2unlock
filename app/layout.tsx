import "./globals.css";

export const metadata = {
  title: "Unlock Link",
  description: "Sub2Unlock personal link gate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
