import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import Services from "./Services";
import ServiceEntry from "./ServiceEntry";
import { fetchData } from "@/lib/utils";

export default async function ServicesWrapper() {
  console.log("Hello from ServicesWrapper");

  const endpoint = "/api/homepage?populate[services][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackServices = {
    heading: 'HEADING',
    lead: 'Lead',
    services: [
      {
        id: 1,
        title: 'Title',
        description: 'Description'
      }
    ]
  };

  const services = data?.services || fallbackServices;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader heading={services.heading} lead={services.lead} />
        <Services defaultOpen={false}>
          {
            services.services.map((service) => (
              <ServiceEntry
                key={service.id}
                title={service.title}
                description={service.description}
              />
            ))
          }
        </Services>
      </div>
    </section>
  )
}
