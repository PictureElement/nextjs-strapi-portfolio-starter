import Hero from "@/components/Hero";
import About from "@/components/About";
// import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";
import { fetchMetadata } from "@/lib/api";

export async function generateMetadata() {
  let data;

  try {
    data = await fetchMetadata('homepage');
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure necessary properties for metadata
  const { title, description, openGraphImage } = data;

  return {
    title,
    description,
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
