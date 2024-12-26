export default function Banner({ headline, supportiveText }) {
  return (
    <section className="triangle-path bg-neutral-100 py-24 relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-1/4 after:h-full after:bg-neutral-200/50">
      <div className="relative mx-auto max-w-5xl px-4 text-center z-10">
        <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{headline}</h1>
        <p className="text-gray-700 text-lg mt-6">{supportiveText}</p>
      </div>
    </section>
  )
}
