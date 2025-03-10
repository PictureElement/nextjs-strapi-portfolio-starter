import Banner from "@/components/Banner";
import { fetchContactPage, fetchLayout } from "@/lib/api";
import Form from "@/components/Form";
import NoSSRWrapper from "@/components/NoSSRWrapper";
import Link from "next/link";
import ContactLink from "@/components/ContactLink";

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
  const [page, global] = await Promise.allSettled([fetchContactPage(), fetchLayout()]);

  if (page.status === 'rejected') {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Contact&quot; page.</div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { metadata, banner, contactFormHeading, otherContactOptionsHeading } = page.value;
  const { title, description } = metadata;
  const { headline, supportiveText } = banner;

  let jsonLd = null;
  let businessHours = null;
  let schedulingLink = null;
  let addressLocality = null;
  let isOrganization = null;
  let areaServed = null;

  if (global.status === 'fulfilled') {
    const { siteRepresentation, miscellaneous } = global.value;
    const { siteImage, logo, knowsAbout, siteName, siteDescription, jobTitle, socialChannels } = siteRepresentation;
    businessHours = siteRepresentation.businessHours;
    schedulingLink = siteRepresentation.schedulingLink;
    addressLocality = siteRepresentation.addressLocality;
    isOrganization = siteRepresentation.isOrganization;
    areaServed = siteRepresentation.areaServed;
    const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const extractedSkills = knowsAbout.flatMap(category =>
      category.children.map(skill => skill.name)
    );
    const { htmlLanguageTag } = miscellaneous;

    // Construct the JSON-LD
    jsonLd = {
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
            url: new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href,
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
  }

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
          <Form />
        </article>
        <aside>
          <h2 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-6 sm:mb-10 text-center">{otherContactOptionsHeading}</h2>
          {global.status === 'rejected' ? (
            <div className="text-red-600 text-center">Error: We encountered an issue while loading the contact options and location details.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {process.env.NEXT_PUBLIC_EMAIL_ENCODED &&
                <NoSSRWrapper>
                  <div className="border border-neutral-200 rounded-xl text-center py-8 sm:py-12">
                    <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Email</h3>
                    <ContactLink type="email" className="text-gray-700 font-light text-xl md:text-2xl tracking-tight border-b border-primary-700 hover:border-b-2" showIcon={false} />
                  </div>
                </NoSSRWrapper>
              }
              {process.env.NEXT_PUBLIC_TELEPHONE_ENCODED &&
                <NoSSRWrapper>
                  <div className="border border-neutral-200 rounded-xl text-center py-8 sm:py-12">
                    <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">Telephone</h3>
                    <ContactLink type="telephone" className="text-gray-700 font-light text-xl md:text-2xl tracking-tight border-b border-primary-700 hover:border-b-2" showIcon={false} />
                  </div>
                </NoSSRWrapper>
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
          )}
        </aside>
      </section>
    </>
  );
}

const ContactOption = ({ title, label, href, rel = undefined, target = undefined }) => (
  <div className="border border-neutral-200 rounded-xl text-center py-8 sm:py-12">
    <h3 className="text-gray-900 font-medium text-xl md:text-2xl tracking-tight mb-2">{title}</h3>
    <Link className="text-gray-700 font-light text-xl md:text-2xl tracking-tight border-b border-primary-700 hover:border-b-2" href={href} rel={rel} target={target}>{label}</Link>
  </div>
);
