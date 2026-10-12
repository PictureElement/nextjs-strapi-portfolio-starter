import SectionHeader from './SectionHeader';
import ExperienceList from './ExperienceList';
import ShapeDivider from './ShapeDivider';

export default function Experience({ data }) {
  // Destructure the necessary properties
  const { headline, supportiveText, experienceList } = data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <ExperienceList experienceList={experienceList} />
      </div>
    </section>
  );
}
