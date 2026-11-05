"use client"
import Image from "next/image"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import type { EventFormData } from "@/app/type/type"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import EditEventDialog from "./EditEventDialog"
import { jwtTokenForClient } from "@/lib/jwt-token-get/jwtTokenForClient"

type ManageEventCardProps = {
  event: EventFormData
}

export default function ManageEventCard({ event }: ManageEventCardProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleConfirmDelete = async () => {
    try {
      const token = await jwtTokenForClient()

      // delete form one collection
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/all-event/${session?.user?.email}_${event._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      const response = await res.json()

      // delete from another collection
      const resAfterDelete = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/joined-event-admin/${session?.user?.email}/${event._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      const responseAfterDelete = await resAfterDelete.json()

      if (response?.deletedCount > 0 || responseAfterDelete?.deletedCount > 0) {
        toast.success("You deleted an Event")
      } else {
        toast.error("Failed to delete the event")
      }

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete event:", error)
      toast.error("Failed to delete the event. Please try again.")
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 transition-shadow hover:border-[#26AE60] hover:shadow-md dark:border-neutral-800">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full">
        <Image
          src={event.thumbnail || "banner.webp"}
          alt={event.title || "Banner image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {event.title}
          </h3>
          <span className="shrink-0 rounded-full bg-[#26AE60]/10 px-3 py-1 text-xs font-medium text-[#26AE60]">
            {event.eventType}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {event.description}
        </p>

        <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[#FB8072]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 shrink-0 text-[#FB8072]" />
            <span>{event.eventDate}</span>
          </div>
        </div>

        {/* Action buttons — no functionality yet */}
        <div className="mt-auto flex gap-3 pt-1">
          <EditEventDialog event={event} />
          <button
            type="button"
            onClick={() => {
              setOpen(true)
            }}
            className="flex-1 cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-[#FB8072] transition-colors hover:bg-[#FB8072]/10 dark:border-neutral-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* confirm delete dialog box */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-200 sm:max-w-md dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Are you absolutely sure?
            </DialogTitle>

            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              event and remove its data from the database.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-end gap-2">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer border-none duration-500 hover:bg-[#10723a] hover:text-white"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              className="cursor-pointer bg-white/90 font-bold text-red-700 duration-500 hover:bg-[#d02f1d] hover:text-white dark:bg-black"
              type="button"
              onClick={handleConfirmDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  )
}
