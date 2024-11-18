import ShapeDivider from "@/components/ShapeDivider";
import SectionHeader from "@/components/SectionHeader";
import Chart from "@/components/Chart";

async function getSkills() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
  const path = "/api/homepage?populate[skills][populate]=*";
  const url = new URL(path, baseUrl);

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
      throw new Error('Failed to fetch skills');
    }

    const data = await res.json();

    return data?.data?.skills;
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the error message
    return null;
  }
}

export default async function Skills() {
  const skills = await getSkills();

  return (
    <section className="bg-neutral-50 py-24 relative" >
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader heading={skills.heading} lead={skills.lead} />
        <Chart data={skills.chartData} />
      </div>
    </section >
  )
}
