import JoinedEventBtn from "@/components/JoinedEventBtn";
import {  Card } from "@heroui/react";
import {
  CalendarDays,
  MapPin,
  Tag,
} from "lucide-react";
import Image from "next/image";

const DetailsPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;

    const res = await fetch(
      `http://localhost:5000/details-event/${id}`, {
        cache: "no-store"
      }
    )

    const eventData = await res.json();
    console.log(eventData, "eventData for details event");

    return (
      <div className="min-h-screen bg-neutral-100 px-4 py-8 text-neutral-900 transition-colors duration-300 max-md:px-3 max-sm:py-4 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg max-sm:rounded-lg dark:border-neutral-800 dark:bg-neutral-900">
          {/* Hero Section */}
          <section className="relative h-[400px] max-lg:h-[350px] max-md:h-[320px] max-sm:h-[260px]">
            <Image
              src={eventData.thumbnail}
              alt={eventData.title}
              fill
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute bottom-0 left-0 w-full p-10 text-white max-md:p-6 max-sm:p-4">

              <h1 className="max-w-2xl text-4xl leading-tight font-bold max-md:text-3xl max-sm:text-2xl">
                {eventData.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-neutral-200 max-sm:text-xs">
                <CalendarDays size={16} />
                {new Date(eventData.eventDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </section>

          {/* Event Information Bar */}
          <div className="grid grid-cols-3 gap-5 border-b border-neutral-200 p-6 max-md:gap-3 max-md:p-5 max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-4 dark:border-neutral-800">
            {/* Date */}
            <div className="flex items-center gap-3">
              <CalendarDays className="shrink-0 text-[#26AE60]" size={22} />

              <div className="min-w-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Event Date
                </p>
                <p className="text-sm font-semibold max-sm:text-xs">
                  {new Date(eventData.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin className="shrink-0 text-[#26AE60]" size={22} />

              <div className="min-w-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Location
                </p>
                <p className="truncate text-sm font-semibold max-sm:text-xs">
                  {eventData.location}
                </p>
              </div>
            </div>

            {/* Event Type */}
            <div className="flex items-center gap-3">
              <Tag className="shrink-0 text-[#26AE60]" size={22} />

              <div className="min-w-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Event Type
                </p>
                <p className="text-sm font-semibold max-sm:text-xs">
                  {eventData.eventType}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-10 p-10 max-lg:gap-7 max-md:grid-cols-1 max-md:gap-8 max-md:p-6 max-sm:gap-6 max-sm:p-4">
            {/* Event Overview */}
            <div className="col-span-2 max-md:col-span-1">
              <h2 className="mb-4 text-xl font-bold max-sm:text-lg">
                Event Overview
              </h2>

              <p className="text-sm leading-7 whitespace-pre-line text-neutral-600 max-sm:text-[13px] max-sm:leading-6 dark:text-neutral-400">
                {eventData.description}
              </p>


            </div>

            {/* Sidebar */}
            <aside className="col-span-1 max-md:col-span-1">
              <Card className="sticky top-6 gap-0 rounded-xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm max-md:static max-sm:p-4 dark:border-neutral-800 dark:bg-neutral-950">
              

                <h3 className="text-lg font-bold max-sm:text-base">
                  Interested in this event?
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                  Be a part of this event and make a positive difference in your
                  community.
                </p>

                <hr className="my-5 bg-neutral-200 dark:bg-neutral-800" />

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Organized By
                    </p>
                    <p className="mt-1 text-sm font-medium break-all">
                      {eventData.email}
                    </p>
                  </div>
                </div>

               {/* joined btn */}
               <JoinedEventBtn eventData={eventData}/>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    )
};

export default DetailsPage;