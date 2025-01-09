import Hero from "@/components/Hero";
import About from "@/components/About";
// import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";
import { fetchStaticPageMetadata } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('homepage');
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Home | ${p.openGraph.siteName}`,
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
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <FeaturedProjects />
        {/* <Services /> */}
        <Testimonials />
        <LatestPosts />
        <Faq />
      </main>
    </>
  );
}
