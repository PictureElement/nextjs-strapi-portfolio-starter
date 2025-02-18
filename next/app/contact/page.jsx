import Banner from "@/components/Banner";
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchContactPage, fetchLayout } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let page;

  try {
    page = await fetchContactPage();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { metadata } = page;
  const { title, description, image } = metadata;
  const url = new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Contact | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page() {
  let page, global = null;

  try {
    [page, global] = await Promise.all([fetchContactPage(), fetchLayout()]);
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="text-center">
        <div className="text-red-600">Unable to load data for the Contact page</div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { metadata, banner, contactFormHeading, otherContactOptionsHeading } = page;
  const { title, description } = metadata;
  const { headline, supportiveText } = banner;
  const { siteRepresentation, miscellaneous } = global;
  const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, businessHours, email, telephone, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
  const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const extractedSkills = knowsAbout.flatMap(category =>
    category.children.map(skill => skill.name)
  );
  const { htmlLanguageTag } = miscellaneous;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: title ? title : `Contact | ${siteName}`,
        description: description ? description : siteDescription,
        url: new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href,
        inLanguage: htmlLanguageTag,
        isPartOf: {
          "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
        },
      },
      {
        "@type": "WebSite",
        "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
        url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: siteName,
        description: siteDescription,
        inLanguage: htmlLanguageTag,
        publisher: {
          "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
        },
      },
      {
        "@type": isOrganization ? "Organization" : "Person",
        "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: siteName,
        description: siteDescription,
        url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        contactPoint: {
          "@type": "ContactPoint",
          email: email,
          ...(telephone && { telephone: telephone })
        },
        ...(isOrganization && { logo: logoUrl }),
        image: siteImageUrl,
        ...(!isOrganization && { jobTitle: jobTitle }),
        ...(schedulingLink || socialChannels.length > 0 ? {
          sameAs: [
            ...(schedulingLink ? [schedulingLink] : []),
            ...socialChannels.map((item) => item.url)
          ]
        } : {}),
        knowsAbout: extractedSkills,
        address: {
          "@type": "PostalAddress",
          addressLocality: addressLocality,
        },
        ...(isOrganization && areaServed && { areaServed: areaServed }),
      }
    ]
  };

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Banner headline={headline} supportiveText={supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <article className="border border-neutral-200 bg-neutral-50 p-8 sm:p-12 rounded-2xl mb-8 sm:mb-12">
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{contactFormHeading}</h2>
          <form className="flex flex-col gap-6 sm:gap-6">
            <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
              <input
                type="email"
                placeholder="Business Email"
                className="block rounded-lg outline-none peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent sm:text-xl"
              />
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-base peer-focus:text-primary-700">
                Your email
              </span>
            </label>
            <label className="relative block border border-neutral-300 bg-transparent rounded-lg">
              <textarea
                rows="5"
                placeholder="Tell us about your project"
                className="block rounded-lg peer w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-transparent focus:border-transparent focus:outline-none text-xl"
              ></textarea>
              <span className="bg-neutral-50 px-1 absolute left-[12px] top-0 -translate-y-1/2 text-base transition-all peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:text-primary-700">
                Your message
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 transition">
              <div className="relative flex items-center mt-[1px]">
                <input type="checkbox" className="peer size-5 rounded border border-neutral-400 appearance-none checked:bg-primary-700 checked:border-0" />
                <CheckIcon className="absolute hidden fill-white peer-checked:block" />
              </div>
              <div className="text-pretty font-light text-gray-700">
                I have read the <Link href="/privacy-policy" target="_blank" className="font-medium border-b border-primary-700 hover:border-b-2">privacy policy</Link> and consent to having my submitted information collected and processed to respond to my inquiry.
              </div>
            </label>
            <button
              type="submit"
              className="
                group
                inline-flex
                justify-center
                items-center
                transition
                px-4
                h-11
                font-medium
                leading-none
                rounded-lg
                text-white
                border border-primary-700
                hover:border-primary-600
                active:border-primary-500
                bg-primary-700
                hover:bg-primary-600
                active:bg-primary-500
              "
              aria-label="Submit your message"
            >
              Submit message
              <PaperAirplaneIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </button>
          </form>
        </article>
        <aside>
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{otherContactOptionsHeading}</h2>
          <div className="grid grid-cols-1 gap-6">
            <ContactOption title="Email" label={email} href={`mailto:${email.trim()}`} />
            {telephone &&
              <ContactOption title="Phone" label={telephone} href={`tel:${telephone.replace(/\s+/g, '')}`} />
            }
            {schedulingLink &&
              <ContactOption title="Schedule a call" label={schedulingLink} href={schedulingLink} rel="noopener noreferer" target="_blank" />
            }
            <div className="text-center py-8 sm:py-12">
              <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Location</h3>
              <p className="text-gray-700 font-light text-xl md:text-2xl tracking-tight">Based in {addressLocality}{isOrganization && areaServed && ` - Serving ${areaServed}`}</p>
            </div>
            {isOrganization && businessHours &&
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Business hours</h3>
                <p className="text-gray-700 font-light text-xl md:text-2xl tracking-tight">{businessHours}</p>
              </div>
            }
          </div>
        </aside>
      </section>
    </>
  );
}

const ContactOption = ({ title, label, href, rel = undefined, target = undefined }) => (
  <div className="border border-neutral-200 rounded-xl text-center py-8 sm:py-12">
    <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">{title}</h3>
    <a rel={rel} target={target} className="text-gray-700 font-light text-xl md:text-2xl tracking-tight border-b border-primary-700 hover:border-b-2" href={href}>{label}</a>
  </div>
);
