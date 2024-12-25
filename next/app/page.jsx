import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";

export default function Page() {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">
        <Hero />
        <About />
        <Services />
        <FeaturedProjects />
        <Skills />
        {/* <Experience /> */}
        <Testimonials />
        <Faq />
        <LatestPosts />
      </main>
    </>
  );
}
