import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
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
      <main className="overflow-hidden -mt-[73px]">
        <section className="bg-neutral-100 relative">
          <div className="relative z-50 mx-auto max-w-5xl px-4 pt-[168px] pb-24 sm:pt-48 sm:pb-[120px]">
            <div className="text-red-600 text-center">Unable to load data for the Home page</div>
          </div>
        </section>
      </main>
    )
  }

  // Destructure the necessary properties
  const { title, description, openGraphImage } = data;

  return (
    <>
      <main className="overflow-hidden -mt-[73px]">
        <Hero />
        <About />
        <Services />
        <FeaturedProjects />
        <Skills />
        <Experience />
        <Testimonials />
        <Faq />
        <LatestPosts />
      </main>
    </>
  );
}
