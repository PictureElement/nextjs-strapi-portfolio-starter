import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceList from "./ServiceList";

export default function Services({ data }) {
  // Destructure the necessary properties
  const { headline, supportiveText, serviceList } = data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <ServiceList serviceList={serviceList} defaultOpen={false} />
      </div>
    </section>
  )
}
