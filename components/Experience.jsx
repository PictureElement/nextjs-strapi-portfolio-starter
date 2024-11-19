import SectionHeader from "./SectionHeader";
import Timeline from "./Timeline";

export default function Experience() {
  console.log("Hello from Experience");
  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeader heading="PROFESSIONAL JOURNEY" lead="An overview of my roles and experiences to date" />
      <Timeline />
    </section>
  )
}
