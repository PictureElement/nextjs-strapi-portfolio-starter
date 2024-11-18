import SectionHeader from "@/components/SectionHeader";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Timeline from "@/components/Timeline";
import Chart from "@/components/Chart";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Image from 'next/image';
import PostList from "@/components/PostList";
import ServiceGrid from "@/components/ServiceGrid";
import FaqList from "@/components/FaqList";
import CallToAction from "@/components/CallToAction";
import BtnSecondary from "@/components/BtnSecondary";
import ShapeDivider from "@/components/ShapeDivider";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">

        <Hero />

        <About />

        {/* Services */}
        <section className="bg-neutral-50 py-24 relative">
          <ShapeDivider />
          <div className="relative mx-auto max-w-4xl px-4">
            <SectionHeader heading="SERVICES" lead="Expert web solutions that drive business growth" />
            <ServiceGrid />
          </div>
        </section>

        {/* Work */}
        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader heading="FEATURED PROJECTS" lead="See how I’ve helped businesses succeed online" />
          <ProjectsCarousel />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
            <BtnSecondary label="View all work" url="#" />
          </div>
        </section>

        {/* Skills */}
        <section className="bg-neutral-50 py-24 relative">
          {/* Linear gradient for the container to give a faded look
          <div
            className="absolute pointer-events-none inset-0 bg-white"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white)",
              maskImage: "linear-gradient(to bottom, transparent 20%, white)"
            }}
          >
          </div> */}
          <ShapeDivider />
          <div className="relative mx-auto max-w-4xl px-4">
            <SectionHeader heading="EXPERTISE" lead="The technical and soft skills I use to build success" />
            <Chart />
          </div>
        </section>

        {/* Experience */}
        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader heading="PROFESSIONAL JOURNEY" lead="An overview of my roles and experiences to date" />
          <Timeline />
        </section>

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

        {/* FAQ */}
        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader heading="COMMON QUESTIONS" lead="Everything you need to know about working together" />
            <FaqList />
          </div>
        </section>

        <CallToAction heading="Elevate your business with expert web solutions" text="If you've made it down this far why not send me an email? I'm currently booking in new projects starting from December so don't miss out!" />

      </main>
    </>
  );
}
