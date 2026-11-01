"use client"

import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"
import ToggleThemeBtn from "@/components/Toggle-theme-btn"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { LogOutIcon, UserIcon } from "lucide-react"
import Image from "next/image"

const menuLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Event" },
  { href: "/joined-events", label: "Joined Event" },
]

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Logo"
            width={9}
            height={9}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-semibold text-neutral-900 dark:text-neutral-50 max-sm:hidden">
            SocialEvent
          </span>
        </Link>

        {/* Middle: upcoming event link */}
        <Link
          href="/events"
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-[#26AE60] dark:text-neutral-300 "
        >
          Upcoming Event
        </Link>

        {/* Right: auth area + theme toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#26AE60] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950">
                  <Image
                    src={user.image || "/random.jpeg"}
                    alt={user.name || "User"}
                    width={9}
                    height={9}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#26AE60]"
                  />
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="w-64 gap-0 overflow-hidden bg-white p-0 text-neutral-900 shadow-xl ring-1 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-700"
                >
                  <PopoverHeader className="border-b border-neutral-200 p-3 dark:border-neutral-700">
                    <PopoverTitle>{user.name}</PopoverTitle>
                    <PopoverDescription className="text-neutral-500 dark:text-neutral-400">
                      {user.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <div className="flex flex-col p-1.5">
                    {menuLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-neutral-200 p-1.5 dark:border-neutral-700">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    >
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[#FB8072] transition-colors hover:bg-[#FB8072]/10"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <button
                type="button"
                onClick={() => signOut()}
                className="hidden rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-[#FB8072] hover:text-[#FB8072] dark:border-neutral-700 dark:text-neutral-200 sm:block"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[#26AE60] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Login
            </Link>
          )}

          <ToggleThemeBtn />
        </div>
      </div>
    </header>
  )
}
