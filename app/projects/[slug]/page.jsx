export default function Page({ params }) {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">
        <div className="py-80">Project: {params.slug}</div>
      </main>
    </>
  );
}