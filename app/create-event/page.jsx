"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Education",
  "Blood Donation",
  "Community Service",
]

export default function CreateEventPage() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState(null)

  // Collects all form data into a plain object, then opens the dialog
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    setPreview(data)
    setOpen(true)
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top-left CTA text */}
      <h1 className="mb-8 text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 max-sm:text-2xl">
        Create Event to help people
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800"
        noValidate
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
            className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
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
            className="resize-y rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
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
              className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
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
              className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
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
              className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
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
              className="rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
            />
          </div>
        </div>

        {/* Reset + Create buttons */}
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="reset"
            className="rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#26AE60] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Create
          </button>
        </div>
      </form>

      {/* Confirmation dialog showing the collected data */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-4 bg-white p-5 text-neutral-900 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-700">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-lg font-semibold">
              Confirm Event
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400">
              Please review the event details before confirming.
            </DialogDescription>
          </DialogHeader>

          {preview && (
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                  Title
                </dt>
                <dd className="text-neutral-900 dark:text-neutral-100">
                  {preview.title}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                  Event Date
                </dt>
                <dd className="text-neutral-900 dark:text-neutral-100">
                  {preview.eventDate}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                  Event Type
                </dt>
                <dd className="text-neutral-900 dark:text-neutral-100">
                  {preview.eventType}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                  Description
                </dt>
                <dd className="text-neutral-900 dark:text-neutral-100">
                  {preview.description}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-500 dark:text-neutral-400">
                  Location
                </dt>
                <dd className="text-neutral-900 dark:text-neutral-100">
                  {preview.location}
                </dd>
              </div>
            </dl>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#26AE60] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
