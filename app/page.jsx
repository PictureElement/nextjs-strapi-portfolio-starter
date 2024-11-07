import SectionHeader from "@/components/SectionHeader";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Timeline from "@/components/Timeline";
import Chart from "@/components/Chart";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      <main className="overflow-hidden">

        {/* Hero */}
        <section className="bg-primary-50">
          <div className="mx-auto max-w-4xl px-4 pt-40 pb-24 sm:pt-48 sm:pb-48 text-center">
            <p className="text-3xl font-normal text-primary-700">👋 Hi, I’m Marios Sofokleous</p>
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
                  border border-primary-700
                  hover:border-primary-600
                  active:border-primary-500
                  bg-primary-700
                  hover:bg-primary-600
                  active:bg-primary-500
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
              >
                View my work
                <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="ABOUT ME" lead="Here’s my story" />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="relative z-10">
              <div className="flex gap-x-4">
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
                    border border-primary-100
                    text-primary-700
                    bg-primary-50
                    hover:bg-primary-100
                    active:bg-primary-200
                    focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                  "
                >
                  Contact me
                  <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
                </a>
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
                    border border-primary-100
                    text-primary-700
                    bg-primary-50
                    hover:bg-primary-100
                    active:bg-primary-200
                    focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                  "
                >
                  Contact me
                  <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
                </a>
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

            <div className="relative flex items-center bg-primary-50 rounded-b-lg border-x border-b border-primary-100 lg:rounded-none lg:rounded-r-lg lg:border-l-0 lg:border-y">
              <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-primary-50 lg:rounded-l-lg lg:border-y lg:border-l border-primary-100"></span>
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
        <section className="bg-primary-50 py-12 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader heading="SERVICES" lead="Here’s my story" />
          </div>
        </section>

        {/* Work */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="WORK" lead="A selection of stuff I’ve built" />
          <ProjectsCarousel />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
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
                  border border-primary-100
                  text-primary-700
                  bg-primary-50
                  hover:bg-primary-100
                  active:bg-primary-200
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
            >
              View all my work
              <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-primary-50 py-12 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader heading="SKILLS" lead="Hard & soft skills" />
            <Chart />
          </div>
        </section>

        {/* Experience */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="EXPERIENCE" lead="Where I’ve worked" />
          <Timeline />
        </section>

        {/* Testimonials */}
        <section className="bg-primary-50 py-12 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader heading="TESTIMONIALS" lead="Nice things people have said" />
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Blog */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:py-24">
          <SectionHeader heading="BLOG" lead="Latest posts" />
          <PostList />
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
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
                  border border-primary-100
                  text-primary-700
                  bg-primary-50
                  hover:bg-primary-100
                  active:bg-primary-200
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
            >
              View all posts
              <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-primary-50 py-12 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <SectionHeader heading="FAQ" lead="Answers to anything you might ask" />
          </div>
        </section>

      </main>
    </div >
  );
}
