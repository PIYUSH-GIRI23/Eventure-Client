import "./globals.css";
import Providers from "@/app/state/providers";

export const metadata = {
  title: "Eventure AI",
  description: "AI Powered event and volunteer management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
