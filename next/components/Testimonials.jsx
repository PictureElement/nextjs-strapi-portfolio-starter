import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import TestimonialList from "./TestimonialList";
import { fetchData } from "@/lib/utils";
import { testimonialsDataSchema } from "@/lib/schemas";

export default async function Testimonials() {
  console.log("Hello from Testimonials");

  const endpoint = "/api/homepage?populate[testimonials][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = testimonialsDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
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

  const { testimonials } = data.data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={testimonials.headline} supportiveText={testimonials.supportiveText} />
        <TestimonialList testimonialList={testimonials.testimonialList} />
      </div>
    </section >
  );
}
