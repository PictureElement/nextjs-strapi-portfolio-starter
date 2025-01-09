import Banner from "@/components/Banner";
import ProjectGrid from "@/components/ProjectGrid";
import { fetchStaticPageMetadata, fetchProjects } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('projects-page');
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/projects', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Projects | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    }
  }
}

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
  const { headline, supportiveText, projects } = data;

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