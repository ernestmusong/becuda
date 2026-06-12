import type { Metadata } from "next";
import Header from "@/components/common/Header";
import StoreProvider from "./StoreProvider";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Footer from "@/components/common/footer/footer";

export const metadata: Metadata = {
  title: "BECUDA",
  description: "Befang Cultural and Development Association",
  icons: {
    icon: '/becuda-logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
      </body>
    </html>
  );
}
