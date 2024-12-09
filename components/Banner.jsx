export default function Banner({ headline, supportiveText }) {
  return (
    <section className="banner bg-primary-50 py-24 relative">
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{headline}</h1>
        <p className="text-gray-700 text-lg mt-6">{supportiveText}</p>
      </div>
    </section>
  )
}
