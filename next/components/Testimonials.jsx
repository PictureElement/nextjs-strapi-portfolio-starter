import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import TestimonialList from "./TestimonialList";

export default function Testimonials({ data }) {
  // Destructure the necessary properties
  const { headline, supportiveText, testimonialList } = data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <TestimonialList testimonialList={testimonialList} />
      </div>
    </section>
  );
}
