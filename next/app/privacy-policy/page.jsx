import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Banner from "@/components/Banner";
import { fetchPrivacyPage, fetchLayout } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let page;

  try {
    page = await fetchPrivacyPage();
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
  const url = new URL('/privacy-policy/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Privacy Policy | ${p.openGraph.siteName}`,
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
    [page, global] = await Promise.all([fetchPrivacyPage(), fetchLayout()]);
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Unable to load data for the "Privacy Policy" page</div>
      </div>
    );
  }

  // Destructure/Format the necessary properties
  const { metadata, banner, content } = page;
  const { title, description } = metadata;
  const { headline, supportiveText } = banner;
  const { siteRepresentation, miscellaneous } = global;
  const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, email, telephone, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
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
        "@type": "WebPage",
        "@id": new URL('/privacy-policy/', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: title ? title : `Privacy policy | ${siteName}`,
        description: description ? description : siteDescription,
        url: new URL('/privacy-policy/', process.env.NEXT_PUBLIC_WEBSITE).href,
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
        <div
          className="max-w-none prose prose-gray prose-h2:font-medium prose-h3:font-medium prose-strong:font-medium prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
        />
      </section>
    </>
  )
}
