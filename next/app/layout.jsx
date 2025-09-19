import "./globals.css";
import Announcement from '@/components/Announcement';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import { fetchLayout } from '@/lib/api';

export async function generateViewport() {
  let data;

  try {
    data = await fetchLayout();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure the necessary properties
  const themeColor = data.miscellaneous.themeColor;

  return {
    themeColor,
  }
}

export async function generateMetadata() {
  let data;

  try {
    data = await fetchLayout();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {
      description: 'Description',
      openGraph: {
        siteName: 'Site Name',
        images: ['https://placehold.co/1200x630.jpg?text=Fallback+Image'],
      }
    }
  }

  const { siteRepresentation, icons, miscellaneous } = data;

  // Destructure/Format the necessary properties
  const { siteName, siteDescription, siteImage } = siteRepresentation;
  const { iconICO, iconSVG, iconPNG } = icons;
  const { localeString } = miscellaneous;
  const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const icoUrl = new URL(iconICO.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const pngUrl = new URL(iconPNG.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const svgUrl = new URL(iconSVG.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return {
    description: siteDescription,
    openGraph: {
      locale: localeString.replace('-', '_'),
      siteName: siteName,
      images: [siteImageUrl],
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
  let data = null;

  try {
    data = await fetchLayout();
  } catch (error) {
    console.error(error.message);
    data = {
      announcement: null,
      header: null,
      cta: null,
      footer: null,
      siteRepresentation: null,
      miscellaneous: { htmlLanguageTag: 'en' }
    }
  }

  const { announcement, header, cta, footer, siteRepresentation, miscellaneous } = data;

  return (
    <html lang={miscellaneous.htmlLanguageTag}>
      <body className="antialiased text-gray-500 text-base">
        <Announcement data={announcement} />
        <Header data={header} siteRepresentation={siteRepresentation} />
        <main className="relative">
          {children}
        </main>
        <CallToAction data={cta} />
        <Footer data={footer} siteRepresentation={siteRepresentation} />
      </body>
    </html>
  );
}
