import SectionHeader from "./SectionHeader";
import ExperienceList from "./ExperienceList";
import { fetchData } from "@/lib/utils";
import ShapeDivider from "./ShapeDivider";

export default async function Experience() {
  console.log("Hello from Experience");

  const endpoint = "api/homepage?populate[experience][populate][0]=experienceList.companyLogo";
  const data = await fetchData(endpoint);

  const fallbackExperience = {
    headline: 'EXPERIENCE',
    supportiveText: 'Supportive Text',
    experienceList: [
      {
        id: 1,
        role: "Role",
        company: "Company",
        companyUrl: "#",
        duration: "Duration",
        location: "Location",
        content: "Content",
        companyLogo: {
          url: 'https://placehold.co/48x48.png?text=48x48',
          alternativeText: '...'
        }
      },
      {
        id: 2,
        role: "Role",
        company: "Company",
        companyUrl: "#",
        duration: "Duration",
        location: "Location",
        content: "Content",
        companyLogo: {
          url: 'https://placehold.co/48x48.png?text=48x48',
          alternativeText: '...'
        }
      },
    ]
  };

  const experience = data?.experience || fallbackExperience;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-gray-50" />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader headline={experience.headline} supportiveText={experience.supportiveText} />
        <ExperienceList experienceList={experience.experienceList} />
      </div>
    </section>
  )
}
