import { EventFormData } from "@/app/type/type"
import EventCard from "@/components/EventCard"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"

const joinedEvent = async () => {
  // session
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  console.log(session)
  const res = await fetch(
    `http://localhost:5000/joined-event/${session?.user?.email}`
  )

  const joinedEvent: EventFormData[] = await res.json()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 max-sm:text-2xl dark:text-neutral-50">
          Joined Events
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Try to be active on every events
        </p>
      </div>
      {joinedEvent.length === 0 ? (
        <div className="flex h-75 flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-slate-400 text-2xl text-slate-400">
          <p>No Joined Event</p>

          <Link
            href="/events/upcoming-events"
            className="rounded-lg mx-2 bg-[#26AE60] px-5 py-2 text-base text-white transition hover:bg-[#076932]"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1">
          {joinedEvent.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default joinedEvent
