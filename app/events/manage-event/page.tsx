import ManageEventCard from "@/components/ManageEventCard"
import type { EventFormData } from "@/app/type/type"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { unstable_rethrow } from "next/navigation"
import { jwtTokenForServer } from "@/lib/jwt-token-get/jwtTokenForServer"

const ManageEventsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  console.log("session", session)
  // fetch data
  let eventsData: EventFormData[] = []

  try {
    const token = await jwtTokenForServer()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/all-event/${session?.user?.email}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()
    eventsData = Array.isArray(data) ? data : []
  } catch (error) {
    unstable_rethrow(error)
    console.error("Failed to fetch manage events:", error)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 max-sm:text-2xl dark:text-neutral-50">
          Manage Events
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          View, edit, and remove the events you&apos;ve created.
        </p>
      </div>

      {eventsData.length === 0 ? (
        <div className="flex h-75 flex-col items-center justify-center rounded-[10px] border border-dashed border-slate-400 text-2xl text-slate-400">
          <p>No Event Created</p>

          <Link
            href="/events/create-event"
            className="my-2 rounded-lg bg-[#26AE60] px-5 py-2 text-base text-white transition hover:bg-[#076932]"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1">
          {eventsData.map((event) => (
            <ManageEventCard key={event.title} event={event} />
          ))}
        </div>
      )}
    </main>
  )
}

export default ManageEventsPage
