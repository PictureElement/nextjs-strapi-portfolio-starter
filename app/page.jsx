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
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
            <SectionHeader heading="EXPERIENCE" lead="Where I’ve Worked" />
            <Timeline />
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
            <SectionHeader heading="ABOUT" lead="Here’s My Story" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative z-10 lg:py-16">
                <div className="relative h-auto lg:h-full">
                  <img
                    alt=""
                    src="https://msof.me/storage/app/resources/resize/img_c75f3f86038f99f3053f0c3ac9e58345_526_526_0_0_auto.jpg"
                    className="lg:absolute inset-0 h-full w-full object-cover object-top rounded-t-lg lg:rounded-lg"
                  />
                </div>
              </div>

              <div className="relative flex items-center bg-slate-50 rounded-b-lg lg:rounded-lg">
                <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-slate-50 rounded-l-lg"></span>

                <div className="p-6 lg:p-8 about-description">
                  <p>Hello, I'm Marios, a Web Developer from Cyprus specializing in custom web solutions. I build dynamic single-page apps with React and create custom WordPress themes and plugins. Passionate about coding, I bring ideas to life in the browser, delivering high-quality user experiences.</p>
                  <p>As a self-taught developer, I have strong skills in both frontend and backend development, along with a solid understanding of UI/UX design principles. I focus on building high-performance websites that follow best practices, ensure accessibility, and excel in technical SEO. Committed to continuous learning, I always strive to provide the best solutions.</p>
                  <p>Outside of work, I enjoy volleyball, cycling, and swimming. My favorite hobby is flying FPV drones to capture breathtaking cinematic footage. You can view these adventures on Cyprus Drone Works, where I regularly post videos.</p>
                  <p>Feel free to connect with me on GitHub and LinkedIn to explore my work and stay updated on my latest projects.</p>
                  <a
                    href="#"
                    className="
                      inline-block
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
                    Contact Me
                  </a>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>
    </div >
  );
}
