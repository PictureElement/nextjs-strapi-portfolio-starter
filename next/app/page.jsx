import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";
import {
  fetchAbout,
  fetchExperience,
  fetchFaq,
  fetchFeaturedProjects,
  fetchHero,
  fetchLatestPosts,
  fetchServices,
  fetchSkills,
  fetchStaticPageMetadata,
  fetchTestimonials
} from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('homepage');
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

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

  let heroData, aboutData, skillsData, experienceData, featuredProjectsData, servicesData, testimonialsData, latestPostsData, faqData = null;

  try {
    [heroData, aboutData, skillsData, experienceData, featuredProjectsData, servicesData, testimonialsData, latestPostsData, faqData] = await Promise.all([
      fetchHero(),
      fetchAbout(),
      fetchSkills(),
      fetchExperience(),
      fetchFeaturedProjects(),
      fetchServices(),
      fetchTestimonials(),
      fetchLatestPosts(),
      fetchFaq(),
    ]);
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <main>
        <div className="text-red-600 text-center">Unable to load data for the Home page</div>
      </main>
    );
  }

  return (
    <>
      <main className="overflow-hidden -mt-[77px]">
        <Hero data={heroData} />
        <About data={aboutData} />
        <Skills data={skillsData} />
        <Experience data={experienceData} />
        <FeaturedProjects data={featuredProjectsData} />
        <Services data={servicesData} />
        <Testimonials data={testimonialsData} />
        <LatestPosts data={latestPostsData} />
        <Faq data={faqData} />
      </main>
    </>
  );
}
