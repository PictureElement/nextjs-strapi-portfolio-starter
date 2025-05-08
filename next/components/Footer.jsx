import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import NoSSRWrapper from "./NoSSRWrapper";
import ContactLink from "./ContactLink";
import Image from "next/image";

const socialIcons = {
  LinkedIn: (<svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>),
  GitHub: (<svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z" /></svg>),
  X: (<svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" /></svg>),
};

export default async function Footer({ data, siteRepresentation }) {
  if (!data || !siteRepresentation) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="bg-neutral-950">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Footer&quot; component.</div>
        </div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { statement, copyright } = data;
  const { isOrganization, siteName, schedulingLink, socialChannels, businessHours, addressLocality, areaServed } = siteRepresentation;

  return (
    <footer>
      <Link className="text-white/75 text-base transition hover:underline bg-neutral-800 block text-center px-4 py-2" href="#">Back to top</Link>
      <h2 className="sr-only">{siteName} footer</h2>
      <div className="bg-neutral-950">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-5 mb-8">
            {/* Mission statement & social media */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">Statement</h3>
              <p className="mt-4 mb-6 text-white/75 text-base text-center md:text-start">{statement}</p>
              {/* Badges */}
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="https://www.w3.org/WAI/WCAG2AA-Conformance" rel="noopener noreferrer" target="_blank" title="Explanation of WCAG 2 Level AA conformance">
                  <Image
                    className="grayscale hover:grayscale-0 transition"
                    src="/wcag2AA-blue-v.svg"
                    height={28}
                    width={80}
                    alt="Level AA conformance, W3C WAI Web Content Accessibility Guidelines 2.0"
                  />
                </Link>
                <Link href="/privacy-policy/" target="_blank" title="Read our privacy policy">
                  <Image
                    className="grayscale hover:grayscale-0 transition"
                    src="/gdpr-badge.svg"
                    height={28}
                    width={80}
                    alt="GDPR compliance badge"
                  />
                </Link>
              </div>
              {socialChannels.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">Follow {isOrganization ? "us" : "me"}</h3>
                  {socialChannels.length > 0 && (
                    <ul className="mt-5 flex justify-center gap-3 md:justify-start">
                      {socialChannels.map((item) => (
                        <li key={item.id}>
                          <Link href={item.url} rel="noopener noreferrer" target="_blank" className="text-white/75 transition hover:text-white block">
                            <span className="sr-only">{item.label}</span>
                            {socialIcons[item.channel] || (
                              <span className="text-red-500">Icon not found</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="mt-[6px] md:mt-0 col-span-1">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">Navigation</h3>
              <ul className="mt-4 space-y-4">
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href="/">Home</Link>
                </li>
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href="/projects/">Projects</Link>
                </li>
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href="/blog/">Blog</Link>
                </li>
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href="/contact/">Contact</Link>
                </li>
              </ul>
            </div>
            {/* Contact & location */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">Location & contact</h3>
              <h4 className="sr-only">Location information</h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                    <MapPinIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                    <span className="truncate">Based in {addressLocality}</span>
                  </p>
                </li>
                {isOrganization && areaServed &&
                  <li>
                    <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                      <GlobeAltIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                      <span className="truncate">Serving {areaServed}</span>
                    </p>
                  </li>
                }
              </ul>
              <div className="h-px w-1/4 bg-white/15 mx-auto md:mx-0 my-6"></div>
              <h4 className="sr-only">Contact methods</h4>
              <ul className="space-y-4">
                {process.env.NEXT_PUBLIC_EMAIL_ENCODED &&
                  <li>
                    <NoSSRWrapper>
                      <ContactLink type="email" className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75 hover:underline" showIcon={true} />
                    </NoSSRWrapper>
                  </li>
                }
                {process.env.NEXT_PUBLIC_TELEPHONE_ENCODED &&
                  <li>
                    <NoSSRWrapper>
                      <ContactLink type="telephone" className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75 hover:underline" showIcon={true} />
                    </NoSSRWrapper>
                  </li>
                }
                {schedulingLink &&
                  <li>
                    <Link className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75" href={schedulingLink} rel="noopener noreferrer" target="_blank">
                      <CalendarDaysIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                      <span className="group-hover:underline">Schedule a call</span>
                    </Link>
                  </li>
                }
              </ul>
              {isOrganization && businessHours &&
                <>
                  <div className="h-px w-1/4 bg-white/15 mx-auto md:mx-0 my-6"></div>
                  <h4 className="sr-only">Business hours</h4>
                  <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                    <ClockIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                    <span className="truncate">{businessHours}</span>
                  </p>
                </>
              }
            </div>
          </div>

          <div className="h-px bg-white/15 my-10"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:justify-between">
            <Link className="text-white/75 text-base transition hover:underline md:order-2 text-center mb-4 md:mb-0" href="/privacy-policy">Privacy policy</Link>
            <p className="text-white/75 text-base md:order-1 text-center">{copyright}</p>
          </div>

        </div>
      </div>
    </footer >
  );
}
