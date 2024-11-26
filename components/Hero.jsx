import { TypewriterEffect } from './TypewriterEffect';
import BtnPrimary from './BtnPrimary';
import AnimatedGradient from './AnimatedGradient';
import ShapeDivider from './ShapeDivider';
import { Lobster } from 'next/font/google';
import { fetchData } from '@/lib/utils';
import BtnSecondary from './BtnSecondary';
const lobster = Lobster({ weight: '400', subsets: ['latin'] });

export default async function Hero() {
  console.log("Hello from Hero");

  const endpoint = "/api/homepage?populate[hero][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackHero = {
    greeting: null,
    headline: 'Headline',
    supportiveText: 'Supportive text',
    primaryButton: null,
    secondaryButton: null,
  };

  const hero = data?.hero || fallbackHero;

  const words = hero.headline.trim()
    ? hero.headline.trim().split(/\s+/).map((word) => ({ text: word, className: "" }))
    : [{ text: 'Headline', className: '' }];

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
        <p className="text-gray-700 text-lg mt-6">{hero.supportiveText}</p>
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
