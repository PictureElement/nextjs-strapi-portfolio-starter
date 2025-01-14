import Announcement from '@/components/Announcement';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: ['300', '400', '500', '800'], subsets: ['latin'] });
import "./globals.css";
import { fetchAnnouncement, fetchHeader, fetchMiscellaneous } from '@/lib/api';

let htmlLanguageTag = "en";

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
  const { localeString, siteName, description, openGraphImage, iconICO, iconPNG, iconSVG } = data;
  const imageUrl = new URL(openGraphImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const icoUrl = new URL(iconICO.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const pngUrl = new URL(iconPNG.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const svgUrl = new URL(iconSVG.url, process.env.NEXT_PUBLIC_STRAPI).href;

  htmlLanguageTag = data.htmlLanguageTag;

  return {
    description,
    openGraph: {
      locale: localeString.replace('-', '_'),
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

export default async function RootLayout({ children }) {
  let headerData = null;
  let announcementData = null;

  try {
    [headerData, announcementData] = await Promise.all([
      fetchHeader(),
      fetchAnnouncement()
    ]);
  } catch (error) {
    console.error(error.message);
  }

  return (
    <html lang={htmlLanguageTag}>
      <body className={`${poppins.className} antialiased text-gray-500 text-base`}>
        <Announcement announcementData={announcementData} />
        <Header headerData={headerData} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
