import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://avaxsavunma.com";
const defaultTitle = "AVAX Savunma | Askeri Seviye Taktik Ekipman";
const defaultDescription =
  "AVAX Savunma, NATO standartlarında askeri ekipman, taktik giyim, bot, mont ve operasyonel aksesuar tedarikinde uzmanlaşmış profesyonel savunma çözüm ortağınızdır.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | AVAX Savunma",
  },
  description: defaultDescription,
  keywords: [
    "askeri ekipman",
    "taktik giyim",
    "taktik bot",
    "outdoor ekipman",
    "savunma sanayi tedarik",
    "nato standartları",
    "avax savunma",
    "profesyonel teçhizat",
  ],
  creator: "AVAX Savunma",
  authors: [{ name: "AVAX Savunma" }],
  publisher: "AVAX Savunma",
  category: "Defense Industry",
  alternates: {
    canonical: siteUrl,
    languages: {
      tr: siteUrl,
      "tr-TR": siteUrl,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "AVAX Savunma",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "AVAX Savunma logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/logo.png`],
    site: "@avaxsavunma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  applicationName: "AVAX Savunma",
  verification: {
    other: {
      "msvalidate.01": "AVAXSAVUNMA-SEO",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#organization`,
      name: "AVAX Savunma",
      url: siteUrl,
      image: `${siteUrl}/logo.png`,
      telephone: "+90 540 384 33 33",
      email: "info@avaxsavunma.com",
      priceRange: "₺₺",
      currenciesAccepted: "TRY",
      paymentAccepted: "Cash, Credit Card, Wire Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Göksu Mah. Oğuz Kağan Cad. Geçer Apt. No:20/3",
        addressLocality: "Silifke",
        addressRegion: "Mersin",
        postalCode: "33960",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 36.377,
        longitude: 33.934,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/avaxsavunma",
        "https://www.linkedin.com/company/avax-savunma",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Taktik Gömlek",
            category: "https://schema.org/Clothing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Taktik Pantolon",
            category: "https://schema.org/Clothing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Taktik Bot",
            category: "https://schema.org/ShoeStore",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Mont ve Yağmurluk",
            category: "https://schema.org/ClothingStore",
          },
        },
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "AVAX Savunma Ürün Kataloğu",
      url: `${siteUrl}#categories`,
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Taktik Giyim",
          itemListElement: [
            {
              "@type": "Product",
              name: "Taktik Gömlek",
              url: `${siteUrl}#categories`,
            },
            {
              "@type": "Product",
              name: "Taktik Pantolon",
              url: `${siteUrl}#categories`,
            },
            {
              "@type": "Product",
              name: "Outdoor T-Shirt",
              url: `${siteUrl}#categories`,
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Koruyucu Ekipman",
          itemListElement: [
            {
              "@type": "Product",
              name: "Taktik Bot",
              url: `${siteUrl}#categories`,
            },
            {
              "@type": "Product",
              name: "Mont ve Yağmurluk",
              url: `${siteUrl}#categories`,
            },
            {
              "@type": "Product",
              name: "Teçhizat ve Aksesuar",
              url: `${siteUrl}#categories`,
            },
          ],
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} bg-[#030712] text-[#e2e8f0] antialiased`}
      >
        <Script
          id="avax-savunma-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}
