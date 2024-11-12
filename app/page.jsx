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
import BtnPrimary from "@/components/BtnPrimary";
import { TypewriterEffect } from "@/components/TypewriterEffect";

export default function Home() {

  const words = [
    {
      text: "Experienced",
      className: ""
    },
    {
      text: "web",
      className: ""
    },
    {
      text: "developer",
      className: ""
    }
  ];

  return (
    <div>
      <div>Announcement</div>
      <header>Header</header>
      <p>Structure data</p>
      <p>RSS: see tailwind blog</p>
      <main className="overflow-hidden">

        {/* Hero */}
        <section className="bg-primary-50">
          <div className="mx-auto max-w-4xl px-4 pt-40 pb-24 sm:pt-48 sm:pb-48 text-center">
            <p className="text-3xl font-normal text-primary-700">👋 Hi, I’m Marios Sofokleous</p>
            {/* <h1 className="text-balance text-5xl font-bold tracking-wide text-neutral-900 sm:text-6xl">
              Experienced web developer
            </h1> */}
            <h1 className="text-balance text-5xl font-bold tracking-wide text-neutral-900 sm:text-6xl">
              <TypewriterEffect words={words} />
            </h1>
            <p className="mt-6 text-neutral-700 font-light text-base sm:text-xl">
              Crafting tailored web solutions with technical expertise in HTML, CSS, JavaScript, React, and PHP, and a deep understanding of WordPress.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <BtnPrimary label="View my work" url="#" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto max-w-4xl px-4 py-24">
          <SectionHeader heading="MEET YOUR DEVELOPER" lead="Your partner in turning ideas into reality" />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="relative z-10">
              <div className="flex gap-x-4">
                <BtnSecondary label="Contact me" url="#" />
                <BtnSecondary label="View my work" url="#" />
              </div>
              <Image
                className="w-full object-cover rounded-t-lg lg:rounded-lg border border-primary-100 mt-4"
                src="https://msof.me/storage/app/resources/resize/img_c75f3f86038f99f3053f0c3ac9e58345_526_526_0_0_auto.jpg"
                alt="..."
                width={526}
                height={526}
                layout="responsive" // or "fill", "intrinsic", etc. for different layouts
              />
            </div>

            <div className="relative flex items-center bg-neutral-50 rounded-b-lg border-x border-b border-neutral-100 lg:rounded-none lg:rounded-r-lg lg:border-l-0 lg:border-y">
              <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-lg lg:border-y lg:border-l border-neutral-100"></span>
              <div className="p-6 lg:p-8 about-description">
                <p>Hello, I'm Marios, a Web Developer from Cyprus specializing in custom web solutions. I build dynamic single-page apps with React and create custom WordPress themes and plugins. Passionate about coding, I bring ideas to life in the browser, delivering high-quality user experiences.</p>
                <p>As a self-taught developer, I have strong skills in both frontend and backend development, along with a solid understanding of UI/UX design principles. I focus on building high-performance websites that follow best practices, ensure accessibility, and excel in technical SEO. Committed to continuous learning, I always strive to provide the best solutions.</p>
                <p>Outside of work, I enjoy volleyball, cycling, and swimming. My favorite hobby is flying FPV drones to capture breathtaking cinematic footage. You can view these adventures on Cyprus Drone Works, where I regularly post videos.</p>
                <p>Feel free to connect with me on GitHub and LinkedIn to explore my work and stay updated on my latest projects.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-4xl px-4">
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
        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-4xl px-4">
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
        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-4xl px-4">
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
      <footer>Footer</footer>
    </div >
  );
}
