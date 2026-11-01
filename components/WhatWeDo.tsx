import {
  CalendarPlusIcon,
  HeartHandshakeIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

// Local type: only used in this component.
type WhatWeDoCard = {
  icon: LucideIcon
  title: string
  desc: string
}

const cards: WhatWeDoCard[] = [
  {
    icon: CalendarPlusIcon,
    title: "Create Events",
    desc: "Organize and publish events for your community in just a few minutes.",
  },
  {
    icon: UsersIcon,
    title: "Join Events",
    desc: "Discover events near you and register to participate with one click.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Help People",
    desc: "Volunteer your time and connect with causes that truly need you.",
  },
]

export default function WhatWeDo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 max-sm:text-2xl dark:text-neutral-50">
          What We Do
        </h2>
      </div>

      <div className="grid gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-3">
        {cards.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-neutral-200 p-6 transition-shadow hover:shadow-md dark:border-neutral-800"
          >
            <Icon className="mb-4 h-8 w-8 text-[#26AE60]" />
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
