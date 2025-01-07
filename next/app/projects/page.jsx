import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchProjects } from "@/lib/api";

export default async function Page() {
  let data;

  try {
    data = await fetchProjects();
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Projects page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { title, description, openGraphImage, headline, supportiveText, projects } = data;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={headline} supportiveText={supportiveText} />
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