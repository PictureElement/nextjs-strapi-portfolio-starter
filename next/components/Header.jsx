import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { fetchData } from "@/lib/utils";

export default async function Header() {
  console.log("Hello from Header");

  const endpoint = "/api/global?populate[header][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackHeader = {
    logo: {
      alternativeText: "...",
      url: "https://placehold.co/212x44.png?text=212x44",
    },
    logomark: {
      alternativeText: "...",
      url: "https://placehold.co/44x44.png?text=44x44",
    },
    navItems: [
      { id: 1, label: "Label", url: "/", openLinkInNewTab: false, sameHostLink: true },
      { id: 2, label: "Label", url: "/", openLinkInNewTab: false, sameHostLink: true },
      { id: 3, label: "Label", url: "/", openLinkInNewTab: false, sameHostLink: true }
    ],
    cta: {
      label: "Label",
      url: "/",
      openLinkInNewTab: false,
      sameHostLink: true
    }
  }

  const header = data?.header || fallbackHeader;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI;

  const logoUrl = header.logo.url.startsWith('https')
    ? header.logo.url
    : `${baseUrl}${header.logo.url}`;

  const logomarkUrl = header.logomark.url.startsWith('https')
    ? header.logomark.url
    : `${baseUrl}${header.logomark.url}`;

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
            alt={header.logo.alternativeText}
            className="hidden md:block"
            width="212"
            height="44"
          />
          <Image
            priority
            src={logomarkUrl}
            alt={header.logomark.alternativeText}
            className="md:hidden"
            width="44"
            height="44"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">

          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {header.navItems.map((item) => (
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
              target={header.cta.openLinkInNewTab ? "_blank" : undefined}
              rel={header.cta.sameHostLink ? undefined : "noopener noreferrer"}
              label={header.cta.label}
              url={header.cta.url}
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
