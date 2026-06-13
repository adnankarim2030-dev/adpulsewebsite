import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AdPulse Media Agency",
  description: "AdPulse IMC is a premium 360 media agency in Karachi providing TVC production, digital marketing, outdoor media, and branding solutions.",
  metadataBase: new URL('https://adpulse.pk'),
  openGraph: {
    title: "AdPulse Media Agency",
    description: "AdPulse IMC is a premium 360 media agency in Karachi providing TVC production, digital marketing, outdoor media, and branding solutions.",
    url: "https://adpulse.pk",
    siteName: "AdPulse IMC",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "AdPulse Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AdPulse Media Agency",
    description: "AdPulse IMC is a premium 360 media agency in Karachi providing TVC production, digital marketing, outdoor media, and branding solutions.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollAnimations />
        <Chatbot />
      </body>
    </html>
  );
}
