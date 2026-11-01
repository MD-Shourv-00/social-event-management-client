import Link from "next/link"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="font-semibold">SocialEvent</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400">
              A trusted platform to create, join, and manage social events that
              make a difference.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-400">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-[#26AE60]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-400">
              <li>support@socialdev.com</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} SocialEvent. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
