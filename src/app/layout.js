import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import Chatbot from "@/components/Chatbot";
import "./globals.css";
import "./home.css";
import "./services/services.css";
import "./services/[slug]/service-detail.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AdPulse IMC | Top 360-Degree Media & Advertising Agency in Karachi",
  description: "AdPulse IMC is Pakistan's premier 360-degree media agency headquartered in Karachi. We specialize in TVC productions, digital marketing, OOH, and BTL marketing.",
  keywords: ["AdPulse IMC", "Advertising Agency Karachi", "TVC Production Pakistan", "Media Buying Agency", "OOH Advertising Karachi", "Digital Marketing", "BTL Activations"],
  metadataBase: new URL('https://adpulse.pk'),
  openGraph: {
    title: "AdPulse IMC | Top 360-Degree Media & Advertising Agency",
    description: "AdPulse IMC is Pakistan's premier 360-degree media agency in Karachi providing TVC production, digital marketing, outdoor media, and branding solutions.",
    url: "https://adpulse.pk",
    siteName: "AdPulse IMC",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "AdPulse IMC Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdPulse IMC | Top 360-Degree Media & Advertising Agency",
    description: "AdPulse IMC is Pakistan's premier 360-degree media agency in Karachi providing TVC production, digital marketing, outdoor media, and branding solutions.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "AdvertisingAgency",
      "name": "AdPulse IMC",
      "alternateName": "AdPulse Media Agency",
      "url": "https://adpulse.pk",
      "logo": "https://adpulse.pk/images/chatbot_logo.png",
      "image": "https://adpulse.pk/logo.png",
      "description": "AdPulse IMC is a premium 360-degree media, events, and advertising agency headquartered in Clifton, Karachi, Pakistan. We specialize in TVC productions, digital marketing, OOH, and BTL marketing.",
      "telephone": "+923008463041",
      "email": "info@adpulse.pk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office #213, 2nd Floor, Pak Tower, Block 5 Clifton",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "75600",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "24.8138",
        "longitude": "67.0311"
      },
      "sameAs": [
        "https://www.facebook.com/adpulse.pk/",
        "https://www.instagram.com/adpulse.pk/",
        "https://www.linkedin.com/company/adpulse-imc/"
      ],
      "priceRange": "$$"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which is the top advertising agency in Karachi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AdPulse IMC is recognized as a leading 360-degree media and advertising agency in Karachi, Pakistan, offering comprehensive marketing solutions since its inception."
          }
        },
        {
          "@type": "Question",
          "name": "What services does AdPulse IMC provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide end-to-end services including TVC Productions, Outdoor Media Advertising (OOH), Digital Marketing, Media Buying, Corporate Events, and BTL Activations."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book a media campaign with AdPulse?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a campaign by contacting our expert team via phone at +92 3008463041 or visiting our office at Pak Tower, Block 5 Clifton, Karachi."
          }
        }
      ]
    }
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
