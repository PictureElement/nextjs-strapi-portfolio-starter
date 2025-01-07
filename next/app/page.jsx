import Hero from "@/components/Hero";
import About from "@/components/About";
// import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";
import { fetchHome } from "@/lib/api";

export default async function Page() {
  let data;

  try {
    data = await fetchHome();
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="overflow-hidden">
        <div className="text-red-600 text-center">Unable to load data for the Home page</div>
      </main >
    )
  }

  // Destructure the necessary properties
  const { title, description, openGraphImage } = data;

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
