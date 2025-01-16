import SectionHeader from "./SectionHeader";
import ExperienceList from "./ExperienceList";
import ShapeDivider from "./ShapeDivider";

export default function Experience({ data }) {
  // Destructure the necessary properties
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
