import Banner from "@/components/Banner";
import ProjectList from "@/components/ProjectList";

import { fetchData } from "@/lib/utils";

export default async function Page() {
  // Project List (3 Latest Projects)
  const endpoint = "/api/projects?[populate]=*&sort=publishedAt:desc&pagination[pageSize]=3";

  const [data] = await Promise.all([
    fetchData(endpoint),
  ]);

  const projectList = data?.length > 0 ? data : null;

  return (
    <>
      <main className="overflow-hidden relative">
        <Banner headline="Portfolio" supportiveText="A selection of stuff I’ve built" />
        <section className="mx-auto max-w-4xl px-4 py-24">
          {projectList ? (
            <>
              <ProjectList projectList={projectList} />
            </>
          ) : (
            <p className="text-center text-gray-500">
              No projects available at the moment. Please check back later!
            </p>
          )}
        </section>
      </main>
    </>
  );
}