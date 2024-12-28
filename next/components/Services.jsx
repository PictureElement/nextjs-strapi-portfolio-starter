import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceList from "./ServiceList";
import { fetchData } from "@/lib/utils";

export default async function Services() {
  console.log("Hello from Services");

  const endpoint = "/api/homepage?populate[services][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackServices = {
    headline: 'SERVICES',
    supportiveText: 'Supportive Text',
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
      {
        id: 3,
        title: 'Title',
        description: 'Description'
      },
      {
        id: 4,
        title: 'Title',
        description: 'Description'
      },
    ]
  };

  const services = data?.services || fallbackServices;

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
