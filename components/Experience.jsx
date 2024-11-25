import SectionHeader from "./SectionHeader";
import Timeline from "./Timeline";
import { fetchData } from "@/lib/utils";

export default async function Experience() {
  console.log("Hello from Experience");

  const endpoint = "api/homepage?populate[experience][populate][0]=timeline.companyLogo";
  const data = await fetchData(endpoint);

  const fallbackExperience = {
    heading: 'HEADING',
    lead: 'Lead',
    timeline: [
      {
        id: 1,
        role: "Role",
        company: "Company",
        companyUrl: "#",
        duration: "Duration",
        location: "Location",
        content: "Content",
        companyLogo: {
          url: 'https://placehold.co/136x136.png?text=136x136',
          alternativeText: '...'
        }
      },
    ]
  };

  const experience = data?.experience || fallbackExperience;

  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeader heading={experience.heading} lead={experience.lead} />
      <Timeline data={experience.timeline} />
    </section>
  )
}
