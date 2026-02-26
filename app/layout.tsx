export const metadata = {
  title: "VC Scout",
  description: "VC Sourcing Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "black", color: "white", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}