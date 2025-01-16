import ShapeDivider from "./ShapeDivider";
import SectionHeader from "./SectionHeader";
import Chart from "./Chart";
import ChartSSR from "./ChartSSR";

export default function Skills({ data }) {
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
