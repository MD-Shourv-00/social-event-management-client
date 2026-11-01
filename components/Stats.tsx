// Local type: only used in this component.
type Stat = {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: "120+", label: "Events Created" },
  { value: "4,500+", label: "People Joined" },
  { value: "30+", label: "Cities Reached" },
  { value: "150+", label: "Volunteers Helped" },
]

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="text-4xl font-extrabold text-[#26AE60] max-sm:text-3xl">
              {s.value}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
