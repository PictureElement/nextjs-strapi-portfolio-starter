import ShapeDivider from './ShapeDivider';
import SectionHeader from './SectionHeader';
import Chart from './Chart';
import ChartSSR from './ChartSSR';

export default function Skills({ data, skills }) {
  // Destructure the necessary properties
  const { headline, supportiveText } = data;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        {skills ? (
          <Chart data={skills}>
            <ChartSSR data={skills} />
          </Chart>
        ) : (
          <div className="text-red-600 text-center">
            Error: We encountered an issue while loading the skills.
          </div>
        )}
      </div>
    </section>
  );
}
