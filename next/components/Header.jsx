'use client';

import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useState, useCallback } from 'react';

export default function Header({ headerData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  if (!headerData) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <header id="header" className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15" >
        <div className="flex h-[72px] items-center justify-center px-4">
          <div className="text-red-600">Unable to load data for the Header component</div>
        </div>
      </header>
    );
  }

  // Destructure/Format the necessary properties
  const { logo, additionalNavigationItems, cta, logomark } = headerData;
  const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const logomarkUrl = new URL(logomark.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return (
    <header id="header" className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15" >
      <nav className="flex flex-wrap gap-4 md:gap-6 items-center justify-between p-4">
        {/* Brand */}
        <Link
          href="/"
          className="block text-primary-700"
        >
          <span className="sr-only">Home</span>
          <Image
            priority
            src={logoUrl}
            alt={logo.alternativeText}
            className="hidden md:block"
            width="212"
            height="44"
          />
          <Image
            priority
            src={logomarkUrl}
            alt={logomark.alternativeText}
            className="md:hidden"
            width="44"
            height="44"
          />
        </Link>
        {/* CTA & Toggler  */}
        <div className="flex items-center gap-4 md:order-2">
          <BtnPrimary
            target={cta.openLinkInNewTab ? "_blank" : undefined}
            rel={cta.sameHostLink ? undefined : "noopener noreferrer"}
            label={cta.label}
            url={cta.url}
          />
          <button
            className="
                block
                justify-items-center
                w-11 h-11
                rounded-full
                transition
                border border-primary-100
              text-primary-700
              bg-primary-50
              hover:bg-primary-100
              active:bg-primary-200
                md:hidden
              "
            aria-label="Toggle navigation"
            aria-expanded={isExpanded}
            aria-controls="header-navigation"
            onClick={handleClick}
          >
            <span className="sr-only">Toggle menu</span>
            <Bars3Icon className="size-5" />
          </button>
        </div>
        {/* Navigation */}
        <ul id="header-navigation" className={`header-navigation flex flex-col basis-full grow gap-2 text-sm md:flex-row md:basis-auto md:gap-6 ${isExpanded ? 'show' : ''}`}>
          <li><Link href="/projects/" className="text-gray-900 transition hover:text-gray-900/75">Projects</Link></li>
          <li><Link href="/blog/" className="text-gray-900 transition hover:text-gray-900/75">Blog</Link></li>
          <li><Link href="/contact/" className="text-gray-900 transition hover:text-gray-900/75">Contact</Link></li>
          {additionalNavigationItems.length > 0 &&
            additionalNavigationItems.map((item) => (
              <li key={item.id}>
                <Link target={item.openLinkInNewTab ? "_blank" : undefined} rel={item.sameHostLink ? undefined : "noopener noreferrer"} href={item.url} className="text-gray-900 transition hover:text-gray-900/75">
                  {item.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}
