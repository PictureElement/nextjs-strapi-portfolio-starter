import SectionHeader from "@/components/SectionHeader";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import PostList from "@/components/PostList";
import BtnSecondary from "@/components/BtnSecondary";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">

        <Hero />
        <About />
        <Services />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader headline="FEATURED PROJECTS" supportiveText="See how I’ve helped businesses succeed online" />
          <ProjectsCarousel />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
            <BtnSecondary label="View all work" url="#" />
          </div>
        </section>

        <Skills />
        <Experience />
        <Testimonials />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader headline="LATEST POSTS" supportiveText="Fresh perspectives on web development trends" />
          <PostList />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
            <BtnSecondary label="View all posts" url="#" />
          </div>
        </section>

        <Faq />
      </main>
    </>
  );
}
