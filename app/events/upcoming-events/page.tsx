import EventCard from "@/components/EventCard"
import type { EventFormData } from "@/app/type/type"

// Static sample data — replace with dynamic data later.
const upcomingEvents: EventFormData[] = [
  {
    title: "adfadf",
    description: "adfsdfa",
    eventType: "Plantation",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxag1V-J6EsRsWp3TiGodGPGPuiRp5a_RKRp3P5ChZbA&s=10",
    location: "afafaf",
    eventDate: "2026-11-01",
  },
  {
    title: "Beach Cleanup Drive",
    description: "Join us for a morning of cleaning up the shoreline.",
    eventType: "Cleanup",
    thumbnail: "/banner.webp",
    location: "Cox's Bazar Beach",
    eventDate: "2026-11-15",
  },
  {
    title: "Winter Donation Campaign",
    description: "Donate warm clothes to families in need this winter.",
    eventType: "Donation",
    thumbnail: "/random.jpeg",
    location: "Old Town Community Center",
    eventDate: "2026-12-05",
  },
]

const UpcomingEventPage = () => {
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
