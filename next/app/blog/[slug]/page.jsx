import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import SocialShare from "@/components/SocialShare";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchAllSlugs, fetchDynamicPageMetadata, fetchLayout } from "@/lib/api";
import { formatDate } from '@/lib/utils';
import PrismLoader from "@/components/PrismLoader";

// Return a list of "params" to populate the [slug] dynamic segment
export async function generateStaticParams() {
  try {
    return await fetchAllSlugs('posts');
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function generateMetadata({ params }, parent) {
  const slug = (await params).slug;

  let data;

  try {
    data = await fetchDynamicPageMetadata('posts', slug);
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, image } = data;
  const url = new URL(`/blog/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href;
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

  const [post, global] = await Promise.allSettled([fetchPostBySlug(slug), fetchLayout()]);

  if (post.status === 'rejected') {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Error: We encountered an issue while loading the blog post.</div>
      </div>
    );
  }

  // If no post data is found, trigger a 404
  if (!post.value) {
    notFound();
  }

  // Destructure/Format the necessary properties
  const { title, excerpt, content, createdAt, updatedAt, featuredImage, author } = post.value;
  const featuredImageUrl = new URL(featuredImage.url, process.env.NEXT_PUBLIC_STRAPI).href;

  let localeString = 'en-US';
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
    localeString = miscellaneous.localeString

    // Construct the JSON-LD
    jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": new URL(`/blog/${slug}/#blogposting`, process.env.NEXT_PUBLIC_WEBSITE).href,
          headline: title,
          description: excerpt,
          datePublished: createdAt,
          dateModified: updatedAt,
          image: featuredImageUrl,
          inLanguage: htmlLanguageTag,
          ...(author ? {
            author: {
              "@type": author.isOrganization ? "Organization" : "Person",
              name: author.authorName,
              url: author.url,
            }
          } : {}),
          publisher: {
            "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
          },
          isPartOf: {
            "@id": new URL(`/blog/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
          },
          mainEntityOfPage: {
            "@id": new URL(`/blog/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
          },
        },
        {
          "@type": "WebPage",
          "@id": new URL(`/blog/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
          name: `${title} | ${siteName}`,
          description: excerpt,
          url: new URL(`/blog/${slug}/`, process.env.NEXT_PUBLIC_WEBSITE).href,
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
  }

  // Format dates based on locality
  const formattedCreatedAtDate = formatDate(createdAt, localeString);
  const formattedUpdatedAtDate = formatDate(updatedAt, localeString);

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackTo label="Back to blog" url="/blog/" />
      <div className="mx-auto max-w-5xl px-4">
        <article>
          <header>
            <h1 className="text-gray-900 font-bold text-3xl md:text-4xl tracking-tight mb-3">{title}</h1>
            <p className="text-gray-700 font-light leading-7 sm:text-xl mb-4">{excerpt}</p>
            <div className="text-sm mb-12">
              {author &&
                <div className="text-gray-900">By {author.authorName}</div>
              }
              <div>
                Published <time dateTime={createdAt}>{formattedCreatedAtDate}</time>
                {/* Assuming precise time-sensitive updates are not a requirement */}
                {formattedCreatedAtDate !== formattedUpdatedAtDate && (
                  <><span className="px-1">·</span>Updated <time dateTime={updatedAt}>{formattedUpdatedAtDate}</time></>
                )}
              </div>
            </div>
            <Image
              className="mb-12 rounded-2xl overflow-hidden w-full border border-neutral-100"
              priority
              src={featuredImageUrl}
              alt={featuredImage.alternativeText ?? ''}
              width={1468}
              height={769}
              sizes="(max-width: 1024px) calc(100vw - 34px), 990px"
            />
          </header>
          <div className="prose prose-gray prose-h2:font-medium prose-h3:font-medium prose-strong:font-medium prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto">
            <div
              className="[&>*:first-child]:mt-0"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
            />
            <hr />
            <SocialShare />
          </div>
        </article>
      </div>
      <BackTo label="Back to blog" url="/blog/" />
    </>
  );
}