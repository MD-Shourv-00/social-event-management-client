import Image from "next/image"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import type { EventFormData } from "@/app/type/type"
import Link from "next/link"

type EventCardProps = {
  event: EventFormData
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-[#fb80724d]">
      {/* Thumbnail with overlaid title + description */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl max-lg:aspect-[4/3] max-md:aspect-video">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent p-4 pt-16 dark:from-neutral-900 dark:via-neutral-900/90">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-neutral-900 max-sm:text-base dark:text-neutral-50">
              {event.title}
            </h3>
            <span className="rounded-full bg-[#26AE60] px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {event.eventType}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500 max-sm:text-xs dark:text-neutral-400">
            {event.description}
          </p>
        </div>
      </div>

      {/* Footer: location, date, action */}
      <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600 max-sm:text-xs dark:text-neutral-300">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[#FB8072]" />
            <span className="truncate">{event.location}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 shrink-0 text-[#FB8072]" />
            <span>{event.eventDate}</span>
          </span>
        </div>
        <Link
          href={`/events/upcoming-events/${event.eventId || event._id}`}
          type="button"
          className="shrink-0 cursor-pointer rounded-full bg-[#26AE60] px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#10723a]"
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
