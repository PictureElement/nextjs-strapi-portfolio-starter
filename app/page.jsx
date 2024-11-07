import SectionHeader from "@/components/SectionHeader";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Timeline from "@/components/Timeline";
import Chart from "@/components/Chart";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main className="overflow-hidden">

        <section className="bg-primary-light mb-12 sm:mb-24">
          <div className="mx-auto max-w-4xl px-6 pt-40 pb-24 sm:pt-48 sm:pb-48 text-center">
            <p className="text-3xl font-normal text-primary-100">👋 Hi, I’m Marios Sofokleous</p>
            <h1 className="text-balance text-5xl font-bold tracking-wide text-slate-900 sm:text-6xl">
              Experienced web developer
            </h1>
            <p className="mt-6 text-slate-700 font-light text-base sm:text-xl">
              Crafting tailored web solutions with technical expertise in HTML, CSS, JavaScript, React, and PHP, and a deep understanding of WordPress.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <a
                href="#"
                className="
                  group
                  inline-flex
                  transition
                  px-4 py-3
                  font-semibold
                  leading-none
                  rounded-full
                  text-white
                  border border-primary-100
                  bg-primary-100
                  hover:bg-primary-200
                  active:bg-primary-300
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
              >
                View my work
                <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="ABOUT ME" lead="Here’s my story" />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="relative z-10">
              <Image
                className="w-full object-cover rounded-t-lg lg:rounded-lg border border-slate-200"
                src="https://msof.me/storage/app/resources/resize/img_c75f3f86038f99f3053f0c3ac9e58345_526_526_0_0_auto.jpg"
                alt="..."
                width={526}
                height={526}
                layout="responsive" // or "fill", "intrinsic", etc. for different layouts
              />
            </div>

            <div className="relative flex items-center bg-slate-50 rounded-b-lg border-x border-b border-slate-200 lg:rounded-none lg:rounded-r-lg lg:border-l-0 lg:border-y">
              <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-slate-50 lg:rounded-l-lg lg:border-y lg:border-l"></span>
              <div className="p-6 lg:p-8 about-description">
                <p>Hello, I'm Marios, a Web Developer from Cyprus specializing in custom web solutions. I build dynamic single-page apps with React and create custom WordPress themes and plugins. Passionate about coding, I bring ideas to life in the browser, delivering high-quality user experiences.</p>
                <p>As a self-taught developer, I have strong skills in both frontend and backend development, along with a solid understanding of UI/UX design principles. I focus on building high-performance websites that follow best practices, ensure accessibility, and excel in technical SEO. Committed to continuous learning, I always strive to provide the best solutions.</p>
                <p>Outside of work, I enjoy volleyball, cycling, and swimming. My favorite hobby is flying FPV drones to capture breathtaking cinematic footage. You can view these adventures on Cyprus Drone Works, where I regularly post videos.</p>
                <p>Feel free to connect with me on GitHub and LinkedIn to explore my work and stay updated on my latest projects.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="PORTFOLIO" lead="A selection of stuff I’ve built" />
          <ProjectsCarousel />
          <div className="mt-8 flex items-center justify-center gap-x-4">
            <a
              href="#"
              className="
                  group
                  inline-flex
                  transition
                  px-4 py-3
                  font-semibold
                  leading-none
                  rounded-full
                  border border-slate-200
                  text-primary-100
                  bg-slate-50
                  hover:bg-slate-100
                  active:bg-slate-200
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
            >
              View all my work
              <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="TESTIMONIALS" lead="Nice things people have said" />
          <TestimonialsCarousel />
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="EXPERIENCE" lead="Where I’ve worked" />
          <Timeline />
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="SKILLS" lead="Hard & soft skills" />
          <Chart />
        </section>

      </main>
    </div >
  );
}
