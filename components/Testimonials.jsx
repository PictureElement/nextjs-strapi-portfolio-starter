import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import TestimonialList from "./TestimonialList";
import { fetchData } from "@/lib/utils";

export default async function Testimonials() {

  const endpoint = "/api/homepage?populate[testimonials][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackTestimonials = {
    heading: 'HEADING',
    lead: 'Lead',
    testimonialList: [
      {
        id: 1,
        statement: "Statement",
        author: "Author",
        role: "Role",
        company: "Company",
        companyWebsite: "/",
      },
      {
        id: 2,
        statement: "Statement",
        author: "Author",
        role: "Role",
        company: "Company",
        companyWebsite: "/",
      },
      {
        id: 3,
        statement: "Statement",
        author: "Author",
        role: "Role",
        company: "Company",
        companyWebsite: "/",
      }
    ]
  };

  const testimonials = data?.testimonials || fallbackTestimonials;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader heading={testimonials.heading} lead={testimonials.lead} />
        <TestimonialList testimonialList={testimonials.testimonialList} />
      </div>
    </section >
  );
}
