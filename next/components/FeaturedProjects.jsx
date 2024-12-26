import SectionHeader from "./SectionHeader";
import ProjectCarousel from "./ProjectCarousel";
import BtnSecondary from "./BtnSecondary";
import { fetchData } from "@/lib/utils";
import ShapeDivider from "./ShapeDivider";

export default async function FeaturedProjects() {
  console.log("Hello from FeaturedProjects");

  // Featured Projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&filters[isFeatured][$eq]=true"

  // Headline and Supportive Text
  const endpoint2 = "/api/homepage?populate[featuredProjects][populate]=*";

  const [data1, data2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const fallbackFeaturedProjects = {
    headline: 'FEATURED PROJECTS',
    supportiveText: 'Supportive Text',
  }

  const projects = data1?.length > 0 ? data1 : null;
  const featuredProjects = data2?.featuredProjects || fallbackFeaturedProjects;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={featuredProjects.headline} supportiveText={featuredProjects.supportiveText} />
        {projects ? (
          <ProjectCarousel projects={projects} />
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
