// app/layout.tsx
export const metadata = {
  title: "Old Testament App",
  description: "Read the Old Testament in Hebrew and English",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
