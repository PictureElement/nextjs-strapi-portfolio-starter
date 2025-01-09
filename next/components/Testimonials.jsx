import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import TestimonialList from "./TestimonialList";
import { fetchTestimonials } from "@/lib/api";

export default async function Testimonials() {
  let data;

  try {
    data = await fetchTestimonials();
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-white py-24 relative">
        <ShapeDivider className="fill-neutral-50" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the Testimonials component</div>
        </div>
      </section>
    )
  }

  // Destructure the necessary properties
  const { headline, supportiveText, testimonialList } = data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <TestimonialList testimonialList={testimonialList} />
      </div>
    </section >
  );
}
