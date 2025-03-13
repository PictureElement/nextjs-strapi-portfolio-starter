import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchProjectsPage, fetchAllProjects, fetchLayout } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let page;

  try {
    page = await fetchProjectsPage();
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
  const url = new URL('/projects/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Projects | ${p.openGraph.siteName}`,
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
  const [page, projects, global] = await Promise.allSettled([fetchProjectsPage(), fetchAllProjects(), fetchLayout()]);

  if (page.status === 'rejected') {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Projects&quot; page.</div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { metadata, banner } = page.value;
  const { title, description } = metadata;
  const { headline, supportiveText } = banner;

  let jsonLd = null;

  if (global.status === 'fulfilled') {
    // Destructure the necessary properties
    const { siteRepresentation, miscellaneous } = global.value;
    const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
    const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const extractedSkills = knowsAbout.flatMap(category =>
      category.children.map(skill => skill.name)
    );
    const { htmlLanguageTag } = miscellaneous;

    // Construct JSON-LD
    jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": new URL('/projects/', process.env.NEXT_PUBLIC_WEBSITE).href,
          name: title ? title : `Projects | ${siteName}`,
          description: description ? description : siteDescription,
          url: new URL('/projects/', process.env.NEXT_PUBLIC_WEBSITE).href,
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
        <h2 className="sr-only">Explore all projects</h2>
        {projects.status === 'rejected' ? (
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the projects.</div>
        ) : (
          projects.value.length > 0 ? (
            <ProjectGrid projects={projects.value} />
          ) : (
            <p className="text-center text-gray-500">
              No projects available at the moment. Please check back later!
            </p>
          )
        )}
      </section>
    </>
  );
}