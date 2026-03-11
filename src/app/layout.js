import "./globals.css";
import Providers from "@/app/state/providers";
import HeaderContainer from "@/app/components/header/HeaderContainer";
import FooterContainer from "@/app/components/footer/FooterContainer";

export const metadata = {
  title: "Eventure AI",
  description: "AI Powered event and volunteer management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-screen flex flex-col">
            <HeaderContainer />
            <div className="flex-1">{children}</div>
            <FooterContainer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
