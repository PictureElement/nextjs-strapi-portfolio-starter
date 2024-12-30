import ShapeDivider from "./ShapeDivider";
import SectionHeader from "./SectionHeader";
import Chart from "./Chart";
import ChartSSR from "./ChartSSR";
import { fetchData } from "@/lib/utils";
import { skillsDataSchema } from '@/lib/schemas';

export default async function Skills() {
  console.log("Hello from Skills");

  const endpoint = "/api/homepage?populate[skills][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = skillsDataSchema.safeParse(response);

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
          <div className="text-red-600 text-center">Unable to load data for the Skills component</div>
        </div>
      </section>
    )
  }

  // Destructure the necessary properties
  const { skills } = data.data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={skills.headline} supportiveText={skills.supportiveText} />
        <Chart data={skills.chartData} ariaLabelSSR={skills.ariaLabelSSR} ariaLabelCSR={skills.ariaLabelCSR}>
          <ChartSSR data={skills.chartData} />
        </Chart>
      </div>
    </section >
  )
}
