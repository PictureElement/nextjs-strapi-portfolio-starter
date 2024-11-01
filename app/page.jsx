import SectionHeader from "@/components/SectionHeader";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div>
      <main>
        <section className="bg-primary-light">
          <div className="mx-auto max-w-4xl px-6 pt-40 pb-24 sm:pt-48 sm:pb-48 text-center">
            <p className="text-3xl font-normal text-primary-100">👋 Hi, I’m Marios Sofokleous</p>
            <h1 className="text-balance text-5xl font-bold tracking-wide text-slate-900 sm:text-6xl">
              Experienced Web Developer
            </h1>
            <p className="mt-6 text-slate-700 font-light text-base sm:text-xl">
              Crafting tailored web solutions with technical expertise in HTML, CSS, JavaScript, React, and PHP, and a deep understanding of WordPress.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <a
                href="#"
                className="
                  transition ease-out duration-200
                  px-4
                  py-3
                  font-semibold
                  leading-none
                  rounded-full
                  text-white
                  border
                  border-primary-100
                  bg-primary-100
                  hover:bg-primary-200
                  active:bg-primary-300
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
              >
                View Work
              </a>
              <a
                href="#"
                className="
                  transition ease-out duration-200
                  px-4
                  py-3
                  font-semibold
                  leading-none
                  rounded-full
                  text-primary-100
                  border
                  border-primary-100
                  hover:bg-primary-100
                  hover:text-white
                  active:bg-primary-200
                  focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
                "
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-24">
          <SectionHeader heading="PORTFOLIO" lead="A Selection of Stuff I’ve Built" />

        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
            <SectionHeader heading="TESTIMONIALS" lead="Nice Things People Have Said" />
            <TestimonialsCarousel />
          </div>
        </section>

        <section>
          <SectionHeader heading="EXPERIENCE" lead="Where I’ve Worked" />
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
            <Timeline />
          </div>
        </section>
      </main>
    </div >
  );
}
