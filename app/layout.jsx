import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Experienced Web Developer | Marios Sofokleous",
  description: "Crafting tailored web solutions with a blend of technical expertise in HTML, CSS, JavaScript, and PHP, and a deep understanding of WordPress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-500 text-base`}
      >
        {children}
      </body>
    </html>
  );
}
