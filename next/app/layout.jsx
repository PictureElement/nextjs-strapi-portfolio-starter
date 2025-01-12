import Announcement from '@/components/Announcement';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: ['300', '400', '500', '800'], subsets: ['latin'] });
import "./globals.css";
import { fetchMiscellaneous } from '@/lib/api';

let htmlLang = "en-US";

export async function generateViewport() {
  let data;

  try {
    data = await fetchMiscellaneous();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure the necessary properties
  const { themeColor } = data;

  return {
    themeColor,
  }
}

export async function generateMetadata() {
  let data;

  try {
    data = await fetchMiscellaneous();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure/Format the necessary properties
  const { htmlLanguage, openGraphLocale, siteName, description, openGraphImage, iconICO, iconPNG, iconSVG } = data;
  const imageUrl = new URL(openGraphImage.url, process.env.STRAPI).href;
  const icoUrl = new URL(iconICO.url, process.env.STRAPI).href;
  const pngUrl = new URL(iconPNG.url, process.env.STRAPI).href;
  const svgUrl = new URL(iconSVG.url, process.env.STRAPI).href;

  htmlLang = htmlLanguage;

  return {
    description,
    openGraph: {
      locale: openGraphLocale,
      siteName: siteName,
      images: [imageUrl],
    },
    icons: {
      icon: [
        { url: icoUrl, sizes: '32x32' },
        { url: svgUrl, type: 'image/svg+xml' },
      ],
      apple: [
        { url: pngUrl }
      ]
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang={htmlLang}>
      <body className={`${poppins.className} antialiased text-gray-500 text-base`}>
        <Announcement />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
