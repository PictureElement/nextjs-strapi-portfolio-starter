import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { fetchHeader } from '@/lib/api';

export default async function Header() {
  let data;

  try {
    data = await fetchHeader();
  } catch (error) {
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
  const { logo, navItems, cta, logomark } = data;
  const logoUrl = new URL(logo.url, process.env.STRAPI).href;
  const logomarkUrl = new URL(logomark.url, process.env.STRAPI).href;

  return (
    <header id="header" className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15" >
      <div className="flex h-[72px] items-center gap-8 px-4">
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
        <div className="flex flex-1 items-center justify-end md:justify-between">

          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link target={item.openLinkInNewTab ? "_blank" : undefined} rel={item.sameHostLink ? undefined : "noopener noreferrer"} href={item.url} className="text-gray-900 transition hover:text-gray-900/75">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
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
            >
              <span className="sr-only">Toggle menu</span>
              <Bars3Icon className="size-5" />
            </button>
          </div>

        </div>
      </div>
    </header >
  )
}
