import SectionHeader from "./SectionHeader";
import ProjectsCarousel from "./ProjectsCarousel";
import BtnSecondary from "./BtnSecondary";

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeader headline="FEATURED PROJECTS" supportiveText="See how I’ve helped businesses succeed online" />
      <ProjectsCarousel />
      <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
        <BtnSecondary label="View all work" url="#" />
      </div>
    </section>
  )
}
