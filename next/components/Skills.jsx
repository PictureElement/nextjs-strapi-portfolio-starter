import ShapeDivider from "./ShapeDivider";
import SectionHeader from "./SectionHeader";
import Chart from "./Chart";
import ChartSSR from "./ChartSSR";
import { fetchSkills } from "@/lib/api";

export default async function Skills() {
  let data;

  try {
    data = await fetchSkills();
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
  const { headline, supportiveText, chartData, ariaLabelSSR, ariaLabelCSR } = data;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <Chart data={chartData} ariaLabelSSR={ariaLabelSSR} ariaLabelCSR={ariaLabelCSR}>
          <ChartSSR data={chartData} />
        </Chart>
      </div>
    </section >
  )
}
