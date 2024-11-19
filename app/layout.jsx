import AnnouncementWrapper from '@/components/AnnouncementWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sora } from 'next/font/google';
const sora = Sora({ subsets: ['latin'] });
import "./globals.css";

export const metadata = {
  title: "Experienced Web Developer | Marios Sofokleous",
  description: "Crafting tailored web solutions with a blend of technical expertise in HTML, CSS, JavaScript, and PHP, and a deep understanding of WordPress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased text-gray-500 text-base`}>
        <AnnouncementWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
