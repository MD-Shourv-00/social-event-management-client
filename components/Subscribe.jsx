export default function Subscribe() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 max-sm:text-2xl">
          Subscribe Us
        </h2>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Get the latest events and updates straight to your inbox.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-neutral-300 bg-transparent px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#26AE60] dark:border-neutral-700 dark:text-neutral-100"
          />
          <button
            type="button"
            className="rounded-lg bg-[#26AE60] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}
