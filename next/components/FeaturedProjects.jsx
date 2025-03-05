import SectionHeader from "./SectionHeader";
import ProjectCarousel from "./ProjectCarousel";
import BtnSecondary from "./BtnSecondary";
import ShapeDivider from "./ShapeDivider";

export default function FeaturedProjects({ data, projects }) {
  // Destructure the necessary properties
  const { headline, supportiveText } = data;

  return (
    <section className="bg-neutral-50 py-24 relative overflow-hidden">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {projects.status === 'rejected' ? (
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the featured projects.</div>
        ) : (
          projects.value.length > 0 ? (
            <ProjectCarousel projects={projects.value} baseUrl={process.env.NEXT_PUBLIC_STRAPI} />
          ) : (
            <p className="text-center text-gray-500">
              No featured projects available at the moment. Please check back later!
            </p>
          )
        )}
        <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label="View all projects" url="/projects/" showIcon={true} />
        </div>
      </div>
    </section>
  )
}
