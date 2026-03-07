import "./globals.css";

export const metadata = {
  title: "Eventure AI",
  description: "AI Powered event and volunteer management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
