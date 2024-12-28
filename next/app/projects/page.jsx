import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Get the latest projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&sort=publishedAt:desc&pagination[pageSize]=100";

  // Get the banner
  const endpoint2 = "/api/projects-page?populate[banner]=*";

  const [data1, data2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ])

  const fallbackBanner = {
    headline: 'Projects',
    supportiveText: 'Supportive text',
  };

  const projects = data1?.length ? data1 : null;
  const banner = data2?.banner || fallbackBanner;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        {projects ? (
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