import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center px-4 py-20 text-center lg:min-h-[80vh]"
      style={{ backgroundImage: "url(/banner.webp)" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="rounded-2xl bg-[#26ae618a] px-3 py-2 text-sm font-medium tracking-widest text-white/80 uppercase max-sm:text-xs">
          A trusted platform
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight text-white uppercase max-lg:text-4xl max-sm:text-3xl">
          Social Development
        </h1>
        <p className="max-w-md text-sm text-gray-300 max-sm:text-xs">
          create event , join event , help people as much you can.
        </p>
        <Link
          href="/events/upcoming-events"
          className="mt-2 rounded-lg bg-[#26AE60] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Join Event Now
        </Link>
      </div>
    </section>
  )
}
