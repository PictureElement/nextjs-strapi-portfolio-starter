import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Image from "next/image";
import BackTo from "@/components/BackTo";
import BtnPrimary from "@/components/BtnPrimary";
import BtnSecondary from "@/components/BtnSecondary";
import SocialShare from "@/components/SocialShare";

export default async function Page({ params }) {
  // Get project by slug
  const endpoint = `/api/projects?filters[slug]=${params.slug}&populate=*`;

  const data = await fetchData(endpoint);

  const project = data[0];

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const imageUrl = `${baseUrl}${project.featuredImage.url}`;

  const content = (
    <div
      className=""
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(project.content)) }}
    />
  );

  const scopes = project?.scopes.length > 0 ? project.scopes : null;
  const tools = project?.tools.length > 0 ? project.tools : null;
  const demoUrl = project?.demoUrl ? project.demoUrl : null;
  const repoUrl = project?.repoUrl ? project.repoUrl : null;
  const designFileUrl = project?.designFile ? `${baseUrl}${project.designFile.url}` : null;

  return (
    <>
      <BackTo label="Back to projects" url="/projects/" />
      <main>
        <div className="mx-auto max-w-6xl px-4">
          <article>
            <header>
              <h1 className="text-gray-900 font-extrabold text-2xl md:text-3xl tracking-tight mb-3">{project.title}</h1>
              <div className="text-sm leading-6 text-gray-900">Developed by Marios Sofokleous</div>
              <div className="mt-12 rounded-2xl overflow-hidden aspect-[1200/630] w-full relative border border-neutral-100">
                <Image
                  priority
                  className="object-cover object-center"
                  src={imageUrl}
                  alt={project.featuredImage?.alternativeText || "Project featured image"}
                  fill
                />
              </div>
            </header>
            <div className="flex flex-col md:flex-row gap-x-5 justify-center">
              <section className="max-w-none md:w-2/3 prose prose-gray prose-a:no-underline prose-a:font-semibold prose-a:border-b prose-a:border-primary-400 hover:prose-a:border-b-2">
                {content}
                <hr className="border-neutral-100" />
                <SocialShare />
              </section>
              <aside className="order-first md:order-2 md:w-1/3 mt-12 md:pl-5 md:pt-5 md:border-l md:border-neutral-100 self-start">
                <dl className="flex flex-col gap-2 mb-5">
                  <dt className="sr-only">Related links</dt>
                  <dd className="flex flex-col gap-3">
                    {demoUrl && (
                      <BtnPrimary label="View website" url={demoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {repoUrl && (
                      <BtnSecondary label="View source code" url={repoUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                    {designFileUrl && (
                      <BtnSecondary label="View design file" url={designFileUrl} target="_blank" rel="noopener noreferrer" />
                    )}
                  </dd>
                </dl>
                {scopes && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Scope of work</dt>
                    <dd className="flex flex-wrap gap-3">
                      {project.scopes.map((scope) => (
                        <span key={scope.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{scope.title}</span>
                      ))}
                    </dd>
                  </dl>
                )}
                {tools && (
                  <dl className="flex flex-col gap-2 mb-5">
                    <dt className="text-gray-900 font-medium">Toolset</dt>
                    <dd className="flex flex-wrap gap-3">
                      {tools.map((tool) => (
                        <span key={tool.id} className="inline-flex items-center rounded-full bg-neutral-50 py-1 px-3 text-sm text-neutral-700 ring-1 ring-inset ring-primary-700/10">{tool.title}</span>
                      ))}
                    </dd>
                  </dl>
                )}
                <hr className="mt-12 border-neutral-100 md:hidden" />
              </aside>
            </div>
          </article>
        </div >
      </main >
      <BackTo label="Back to projects" url="/projects/" />
    </>
  );
}