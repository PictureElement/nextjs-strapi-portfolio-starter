import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceList from "./ServiceList";
import { fetchData } from "@/lib/utils";
import { servicesDataSchema } from '@/lib/schemas';

export default async function Services() {
  console.log("Hello from Services");

  const endpoint = "/api/homepage?populate[services][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = servicesDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
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
  const { services } = data.data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={services.headline} supportiveText={services.supportiveText} />
        <ServiceList serviceList={services.serviceList} defaultOpen={false} />
      </div>
    </section>
  )
}
