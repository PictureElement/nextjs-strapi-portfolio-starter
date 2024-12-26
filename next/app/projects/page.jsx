import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Get the latest projects
  const endpoint = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&sort=publishedAt:desc&pagination[pageSize]=100";

  const data = await fetchData(endpoint);

  const projects = data?.length > 0 ? data : null;

  return (
    <main className="overflow-hidden relative">
      <Banner headline="Projects" supportiveText="A selection of stuff I’ve built" />
      <section className="mx-auto max-w-5xl px-4 py-24">
        {projects ? (
          <>
            <ProjectGrid projects={projects} />
          </>
        ) : (
          <p className="text-center text-gray-500">
            No projects available at the moment. Please check back later!
          </p>
        )}
      </section>
    </main>
  );
}