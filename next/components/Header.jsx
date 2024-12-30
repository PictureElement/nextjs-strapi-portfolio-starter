import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { fetchData } from "@/lib/utils";
import { headerDataSchema } from "@/lib/schemas";

export default async function Header() {
  console.log("Hello from Header");

  const endpoint = "/api/global?populate[header][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = headerDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
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
  const { header } = data.data;
  const logoUrl = new URL(header.logo.url, process.env.STRAPI).href;
  const logomarkUrl = new URL(header.logomark.url, process.env.STRAPI).href;

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
