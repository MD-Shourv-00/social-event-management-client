"use client"
import React, { FormEvent, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { EventFormData } from "@/app/type/type"
import { useSession } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Education",
  "Blood Donation",
  "Community Service",
]

const EditEventDialog = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  //user session
  const { data: session } = useSession()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries()) as EventFormData

    // setPreview(data)
    setOpen(true)

    // post mehtod use
    setLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/all-event/${session?.user?.email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    setLoading(false)

    const response = await res.json()
    console.log(response, "after update")

    if (response) {
      setOpen(false)
      toast.success("You Successfully create a new Event!")
      redirect("/events/manage-event")
    } else {
      toast.error("Event Not Created! Try again (: ")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#26AE60] hover:text-[#26AE60] dark:border-neutral-700 dark:text-neutral-200"
          >
            Edit
          </button>
        }
      />
      <DialogContent className="gap-4 bg-white p-5 text-neutral-900 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-700">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-lg font-semibold">
            Edit Event
          </DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            Please review your changes before confirm Edit.
          </DialogDescription>
        </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[470px] max-sm:max-w-[340px] 
            max-sm:h-[550] max-sm:overflow-y-auto gap-5 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800"
            
          >
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Event title"
                className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="What is this event about?"
                className="resize-y rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
            </div>

            {/* Event type + Thumbnail (2 columns on desktop) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="eventType"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  defaultValue=""
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:bg-[#121212] dark:text-neutral-300"
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="thumbnail"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Thumbnail Image URL
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Location + Event date (2 columns on desktop) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Event location"
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="eventDate"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Event Date
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Reset + Create buttons */}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#26AE60] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Edit Confirm
              </button>
            </div>
          </form>
        
      </DialogContent>
    </Dialog>
  )
}

export default EditEventDialog
