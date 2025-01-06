import SectionHeader from "./SectionHeader";
import ProjectCarousel from "./ProjectCarousel";
import BtnSecondary from "./BtnSecondary";
import { fetchFeaturedProjects } from "@/lib/api";
import ShapeDivider from "./ShapeDivider";

export default async function FeaturedProjects() {
  console.log("Hello from FeaturedProjects");

  let data;

  try {
    data = await fetchFeaturedProjects();
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-white py-24 relative">
        <ShapeDivider className="fill-neutral-50" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the FeaturedProjects component</div>
        </div>
      </section>
    );
  }

  // Destructure the necessary properties
  const { headline, supportiveText, featuredProjects } = data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {featuredProjects.length > 0 ? (
          <ProjectCarousel projects={featuredProjects} baseUrl={process.env.STRAPI} />
        ) : (
          <p className="text-center text-gray-500">
            No featured projects available at the moment. Please check back later!
          </p>
        )}
        <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
          <BtnSecondary label="View all projects" url="/projects/" />
        </div>
      </div>
    </section>
  )
}
