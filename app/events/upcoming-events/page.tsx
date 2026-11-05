import EventCard from "@/components/EventCard"
import type { EventFormData } from "@/app/type/type"


const UpcomingEventPage = async() => {
  const res = await fetch("http://localhost:5000/all-future-event",{
    cache: "no-store"
  })

  const upcomingEvents: EventFormData[] = await res.json()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 max-sm:text-2xl dark:text-neutral-50">
          Upcoming Events
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Discover and join the next events happening near you.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {upcomingEvents.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
    </main>
  )
}

export default UpcomingEventPage
