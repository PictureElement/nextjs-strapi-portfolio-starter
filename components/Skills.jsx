import ShapeDivider from "./ShapeDivider";
import SectionHeader from "./SectionHeader";
import Chart from "./Chart";
import ChartSSR from "./ChartSSR";
import { fetchData } from "@/lib/utils";

export default async function Skills() {
  console.log("Hello from Skills");

  const endpoint = "/api/homepage?populate[skills][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackSkills = {
    headline: 'SKILLS',
    supportiveText: 'Supportive Text',
    chartData: [{ "name": "Frontend", "children": [{ "name": "JavaScript", "value": 1 }] }, { "name": "Backend", "children": [{ "name": "Node.js", "value": 1 }] }],
    ariaLabelSSR: 'Server-side rendered chart for skills.',
    ariaLabelCSR: 'Client-side interactive chart for skills.'
  };

  const skills = data?.skills || fallbackSkills;

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader headline={skills.headline} supportiveText={skills.supportiveText} />
        <Chart data={skills.chartData} ariaLabelSSR={skills.ariaLabelSSR} ariaLabelCSR={skills.ariaLabelCSR}>
          <ChartSSR data={skills.chartData} />
        </Chart>
      </div>
    </section >
  )
}
