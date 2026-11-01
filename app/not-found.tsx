import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-gray-800">
      <h1
        className="mb-2 text-7xl font-extrabold tracking-tight"
        style={{ color: "#FB8072" }}
      >
        404
      </h1>

      <h2 className="mb-2 text-2xl font-bold">Page Not Found</h2>

      <p className="mb-6 max-w-sm text-sm text-gray-500">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#26AE60" }}
      >
        Go Home
      </Link>
    </main>
  )
}
