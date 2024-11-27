export default function Page({ params }) {
  return (
    <>
      <main className="overflow-hidden -mt-[73px]">
        <div className="py-80">Article: {params.slug}</div>
      </main>
    </>
  );
}