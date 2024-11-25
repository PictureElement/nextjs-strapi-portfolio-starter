import SectionHeader from "@/components/SectionHeader";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Timeline from "@/components/Timeline";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import PostList from "@/components/PostList";
import FaqList from "@/components/FaqList";
import CallToAction from "@/components/CallToAction";
import BtnSecondary from "@/components/BtnSecondary";
import ShapeDivider from "@/components/ShapeDivider";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">

        <Hero />
        <About />
        <Services />

        {/* Work */}
        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader heading="FEATURED PROJECTS" lead="See how I’ve helped businesses succeed online" />
          <ProjectsCarousel />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
            <BtnSecondary label="View all work" url="#" />
          </div>
        </section>

        <Skills />
        <Experience />


        {/* Testimonials */}
        <section className="bg-neutral-50 py-24 relative">
          <ShapeDivider />
          <div className="relative mx-auto max-w-4xl px-4">
            <SectionHeader heading="KIND WORDS" lead="Testimonials from clients and colleagues" />
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Blog */}
        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader heading="LATEST POSTS" lead="Fresh perspectives on web development trends" />
          <PostList />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
            <BtnSecondary label="View all posts" url="#" />
          </div>
        </section>

        <Faq />

        <CallToAction heading="Elevate your business with expert web solutions" text="If you've made it down this far why not send me an email? I'm currently booking in new projects starting from December so don't miss out!" />

      </main>
    </>
  );
}
