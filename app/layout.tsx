import "/styles/globals.css";

export const metadata = {
  title: "Kyle Newbigging",
  description: "Portfolio for Kyle Newbigging",
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
