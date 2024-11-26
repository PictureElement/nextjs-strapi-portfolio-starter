import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceList from "./ServiceList";
import { fetchData } from "@/lib/utils";

export default async function Services() {
  console.log("Hello from Services");

  const endpoint = "/api/homepage?populate[services][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackServices = {
    heading: 'SERVICES',
    lead: 'Lead',
    serviceList: [
      {
        id: 1,
        title: 'Title',
        description: 'Description'
      },
      {
        id: 2,
        title: 'Title',
        description: 'Description'
      },
    ]
  };

  const services = data?.services || fallbackServices;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader heading={services.heading} lead={services.lead} />
        <ServiceList serviceList={services.serviceList} defaultOpen={false} />
      </div>
    </section>
  )
}
