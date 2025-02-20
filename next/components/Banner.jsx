export default function Banner({ headline, supportiveText }) {
  return (
    <section className="triangle-path bg-neutral-100 py-16 relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-1/4 after:h-full after:bg-neutral-200/50">
      <div className="relative mx-auto max-w-5xl px-4 text-center z-10">
        <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl tracking-tight text-center mb-4">{headline}</h1>
        <p className="text-gray-700 text-lg">{supportiveText}</p>
      </div>
    </section>
  )
}