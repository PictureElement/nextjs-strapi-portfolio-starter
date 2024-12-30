import SectionHeader from "./SectionHeader";
import ProjectCarousel from "./ProjectCarousel";
import BtnSecondary from "./BtnSecondary";
import { fetchData } from "@/lib/utils";
import ShapeDivider from "./ShapeDivider";
import { featuredProjectsData1Schema, featuredProjectsData2Schema } from "@/lib/schemas";

export default async function FeaturedProjects() {
  console.log("Hello from FeaturedProjects");

  // Get all featured projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&filters[isFeatured][$eq]=true"

  // Get the headline and supportive text
  const endpoint2 = "/api/homepage?populate[featuredProjects][populate]=*";

  let data1, data2;

  try {
    const [response1, response2] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
    ]);

    const result1 = featuredProjectsData1Schema.safeParse(response1);
    const result2 = featuredProjectsData2Schema.safeParse(response2);

    if (!result1.success) {
      console.error(`Validation failed for ${endpoint1}:`, result1.error);
      throw new Error(`Invalid data received from ${endpoint1}`);
    }

    if (!result2.success) {
      console.error(`Validation failed for ${endpoint2}:`, result2.error);
      throw new Error(`Invalid data received from ${endpoint2}`);
    }

    data1 = result1.data;
    data2 = result2.data;

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

  // Destructure/Format the necessary properties
  const { data: projects } = data1;
  const { featuredProjects } = data2.data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={featuredProjects.headline} supportiveText={featuredProjects.supportiveText} />
        {projects.length > 0 ? (
          <ProjectCarousel projects={projects} baseUrl={process.env.STRAPI} />
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
