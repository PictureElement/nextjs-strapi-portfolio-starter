import SectionHeader from "./SectionHeader";
import ExperienceList from "./ExperienceList";
import ShapeDivider from "./ShapeDivider";
import { fetchExperience } from "@/lib/api";

export default async function Experience() {
  let data;

  try {
    data = await fetchExperience();
  } catch (error) {
    console.log(error);
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-white py-24 relative">
        <ShapeDivider className="fill-gray-50" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the Experience component</div>
        </div>
      </section>
    )
  }

  const { headline, supportiveText, experienceList } = data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-gray-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <ExperienceList experienceList={experienceList} />
      </div>
    </section>
  )
}
