import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceList from "./ServiceList";
import { fetchServices } from "@/lib/api";

export default async function Services() {
  let data;

  try {
    data = await fetchServices();
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-neutral-50 py-24 relative">
        <ShapeDivider className="fill-white" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the Services component</div>
        </div>
      </section>
    )
  }

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
