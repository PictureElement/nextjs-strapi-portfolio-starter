import Banner from "@/components/Banner";

export default async function Page() {
  return (
    <main className="overflow-hidden relative">
      <Banner headline="Contact" supportiveText="If you're interested in exploring the digital possibilities that X Studio has to offer, feel free to contact us today." />
      <section className="mx-auto max-w-4xl px-4 py-24">
        Contact Form
      </section>
    </main>
  );
}