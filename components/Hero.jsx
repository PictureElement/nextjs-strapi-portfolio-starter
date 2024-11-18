import { TypewriterEffect } from './TypewriterEffect';
import BtnPrimary from "@/components/BtnPrimary";
import AnimatedGradient from "@/components/AnimatedGradient";
import ShapeDivider from "@/components/ShapeDivider";
import { Lobster } from 'next/font/google';
import BtnSecondary from './BtnSecondary';
const lobster = Lobster({ weight: '400', subsets: ['latin'] });

async function getHero() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
  const path = "/api/homepage?populate[hero][populate]=*";
  const url = new URL(path, baseUrl);

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
      throw new Error('Failed to fetch hero');
    }

    const data = await res.json();

    return data?.data?.hero;
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the error message
    return null;
  }
}

export default async function Hero() {
  const hero = await getHero();

  const words = hero.title.trim().split(/\s+/).map((word) => ({
    text: word,
    className: ""
  }));

  return (
    <section className="bg-primary-100 relative">
      <AnimatedGradient />
      <ShapeDivider />
      <div className="relative z-50 mx-auto max-w-4xl px-4 pt-40 pb-24 sm:pt-48 sm:pb-48 text-center">
        {hero.greeting && (
          <p className={`${lobster.className} font-normal text-xl sm:text-2xl lg:text-3xl text-primary-700 -rotate-3 mb-4`}>{hero.greeting}</p>
        )}
        <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          <TypewriterEffect words={words} />
        </h1>
        {hero.supportiveText && (
          <p className="text-gray-700 text-lg mt-6">{hero.supportiveText}</p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hero.primaryButton && (
            <BtnPrimary
              target={hero.primaryButton.openLinkInNewTab ? "_blank" : undefined}
              rel={hero.primaryButton.sameHostLink ? undefined : "noopener noreferrer"}
              className="w-full sm:w-auto"
              label={hero.primaryButton.label}
              url={hero.primaryButton.url}
            />
          )}
          {hero.secondaryButton && (
            <BtnSecondary
              target={hero.secondaryButton.openLinkInNewTab ? "_blank" : undefined}
              rel={hero.secondaryButton.sameHostLink ? undefined : "noopener noreferrer"}
              className="w-full sm:w-auto"
              label={hero.secondaryButton.label}
              url={hero.secondaryButton.url}
            />
          )}
        </div>
      </div>
    </section>
  );
}
