import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchData } from "@/lib/utils";
import { projectsData1Schema, projectsData2Schema } from "@/lib/schemas";

export default async function Page() {
  // Get the latest projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100";
  // Get the banner and metadata
  const endpoint2 = "/api/projects-page?populate=*";

  let data1, data2;

  try {
    const [response1, response2] = await Promise.all([
      fetchData(endpoint1),
      fetchData(endpoint2),
    ])

    const result1 = projectsData1Schema.safeParse(response1);
    const result2 = projectsData2Schema.safeParse(response2);

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
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Projects page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { banner } = data2.data;
  const { data: projects } = data1;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <p className="text-center text-gray-500">
            No projects available at the moment. Please check back later!
          </p>
        )}
      </section>
    </main>
  );
}