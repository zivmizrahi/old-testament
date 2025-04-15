// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Old Testament App",
  description: "Read the Bible in Hebrew and English",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
