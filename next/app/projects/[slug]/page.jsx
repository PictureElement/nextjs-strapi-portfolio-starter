import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import BtnPrimary from "@/components/BtnPrimary";
import BtnSecondary from "@/components/BtnSecondary";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { fetchProjectBySlug, fetchAllSlugs, fetchDynamicPageMetadata, fetchLayout } from "@/lib/api";

// Return a list of "params" to populate the [slug] dynamic segment
export async function generateStaticParams() {
  try {
    return await fetchAllSlugs('projects');
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function generateMetadata({ params }, parent) {
  const slug = (await params).slug;

  let data;

  try {
    data = await fetchDynamicPageMetadata('projects', slug);
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, image } = data;
  const url = new URL(`/projects/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return {
    title: `${title} | ${p.openGraph.siteName}`,
    description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page({ params }) {
  const slug = params.slug;

  const [project, global] = await Promise.allSettled([fetchProjectBySlug(slug), fetchLayout()]);

  if (project.status === 'rejected') {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Error: We encountered an issue while loading the project.</div>
      </div>
    );
  }

  // If no project data is found, trigger a 404
  if (!project.value) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const { title, excerpt, duration, demoUrl, repoUrl, content, featuredImage, scopes, tools, designFile, author } = project.value;
  const featuredImageUrl = new URL(featuredImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const designFileUrl = (designFile ? new URL(designFile.url, process.env.NEXT_PUBLIC_STRAPI).href : null);

  let jsonLd = null;

  if (global.status === 'fulfilled') {
    // Destructure/Format the necessary properties
    const { siteRepresentation, miscellaneous } = global.value;
    const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, email, telephone, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
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
          "@type": "ItemPage",
          "@id": new URL(`/projects/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
          name: `${title} | ${siteName}`,
          description: excerpt,
          url: new URL(`/projects/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
          inLanguage: htmlLanguageTag,
          isPartOf: {
            "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
          },
          ...(author ? {
            author: {
              "@type": author.isOrganization ? "Organization" : "Person",
              name: author.authorName,
              url: author.url,
            }
          } : {}),
          image: featuredImageUrl,
          keywords: [
            ...scopes.map(scope => scope.title),
            ...tools.map(tool => tool.title)
          ].join(", "),
          temporalCoverage: duration,
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
  }

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackTo label="Back to projects" url="/projects/" />
      <div className="mx-auto max-w-6xl px-4">
        <article>
          <header>
            <h1 className="text-gray-900 font-bold text-3xl md:text-4xl tracking-tight mb-3">{title}</h1>
            <p className="text-gray-700 font-light leading-7 sm:text-xl mb-4">{excerpt}</p>
            <div className="text-sm mb-12">
              {author &&
                <div className="text-gray-900">By {author.authorName}</div>
              }
              <div>{duration}</div>
            </div>
            <Image
              className="mb-12 rounded-2xl overflow-hidden w-full border border-neutral-100"
              priority
              src={featuredImageUrl}
              alt={featuredImage.alternativeText}
              width={1468}
              height={769}
              sizes="(max-width: 1152px) calc(100vw - 34px), 1118px"
            />
          </header>
          <div className="flex flex-col md:flex-row gap-x-5 justify-between">
            <section className="max-w-none md:w-2/3 prose prose-gray prose-h2:font-medium prose-h3:font-medium prose-strong:font-medium prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mt-12 md:mt-0">
              <div
                className="[&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
              />
              <hr className="border-neutral-100" />
              <SocialShare />
            </section>
            <aside className="order-first md:order-2 md:w-1/3 md:pl-5 md:border-l md:border-neutral-200">
              <dl className="flex flex-col gap-2 mb-5">
                <dt className="sr-only">Related links</dt>
                <dd className="flex flex-col gap-3">
                  {demoUrl && (
                    <BtnPrimary label="View website" url={demoUrl} target="_blank" rel="noopener noreferrer" />
                  )}
                  {repoUrl && (
                    <BtnSecondary label="View source code" url={repoUrl} target="_blank" rel="noopener noreferrer" />
                  )}
                  {designFileUrl && (
                    <BtnSecondary label="View design file" url={designFileUrl} target="_blank" rel="noopener noreferrer" />
                  )}
                </dd>
              </dl>
              {scopes.length > 0 && (
                <dl className="flex flex-col gap-2 mb-5">
                  <dt className="text-gray-900 font-medium">Scope of work</dt>
                  <dd className="flex flex-wrap gap-3">
                    {scopes.map((scope) => (
                      <span key={scope.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{scope.title}</span>
                    ))}
                  </dd>
                </dl>
              )}
              {tools.length > 0 && (
                <dl className="flex flex-col gap-2 mb-5">
                  <dt className="text-gray-900 font-medium">Toolset</dt>
                  <dd className="flex flex-wrap gap-3">
                    {tools.map((tool) => (
                      <span key={tool.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{tool.title}</span>
                    ))}
                  </dd>
                </dl>
              )}
              <hr className="mt-12 border-neutral-100 md:hidden" />
            </aside>
          </div>
        </article>
      </div >
      <BackTo label="Back to projects" url="/projects/" />
    </>
  );
}