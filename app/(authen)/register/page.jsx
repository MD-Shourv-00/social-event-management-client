"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { Form } from "@heroui/react"
import {
  EyeIcon,
  EyeOffIcon,
  ImageIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react"
import {signIn, signUp, useSession} from "../../../lib/auth-client"
import { redirect } from "next/navigation"


const validatePassword = (password) => {
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter"
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter"
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long"
  }
  return null
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  //protected for valied user
  const {data: session} = useSession();
  console.log(session, "session")
  if(session?.user){
    redirect("/");
  }

  // Collects all form data into a plain object
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (!data.name || !data.email || !data.photoURL || !data.password) {
      toast.error("Please fill in all fields")
      return
    }

    const passwordError = validatePassword(data.password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }
    console.log("Register data:", data)

    // send data to better auth for sign up
    setLoading(true)
    const {data:successData, error} = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      callbackURL: '/',
    }) 
    setLoading(false)

    console.log(successData);
    console.log(error);

    if(successData?.user){
      toast.success("Registration successful!")
      redirect("/");
    } else {
      toast.error(`${error.message}`)
    }

  }

  const handleGoogleLogin = async() => {
    // Google sign-in will be wired up later
    const {error} = await signIn.social({
      provider: "google",
    })

    if (!error) {
      toast.success("Sign In with google is successfull!")
    } else {
      toast.error(`Sign In with google is not successfull!`)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 p-8 shadow-sm dark:border-neutral-800">
        <h1 className="text-2xl font-semibold text-black dark:text-neutral-50">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Sign up to start managing events
        </p>

        <Form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Name
            </label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className="w-full rounded-lg border border-neutral-300 bg-transparent py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <div className="relative">
              <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-neutral-300 bg-transparent py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Photo URL
            </label>
            <div className="relative">
              <ImageIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                autoComplete="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-lg border border-neutral-300 bg-transparent py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <div className="relative">
              <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="password"
                className="w-full rounded-lg border border-neutral-300 bg-transparent py-2.5 pr-10 pl-10 text-sm text-neutral-900 transition outline-none focus:border-[#26AE60] focus:ring-2 focus:ring-[#26AE60]/20 dark:border-neutral-700 dark:text-neutral-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              Must contain an uppercase letter, a lowercase letter, and be at
              least 6 characters long.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              style={{ backgroundColor: "#26AE60" }}
              disabled={loading}
              className="w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 transition-opacity hover:opacity-80 dark:border-neutral-700 dark:text-neutral-200"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
                />
              </svg>
              Continue with Google
            </button>

            <Link
              href="/login"
              style={{ borderColor: "#26AE60", color: "#26AE60" }}
              className="block w-full rounded-lg border py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-80"
            >
              Go to Login
            </Link>
          </div>
        </Form>
      </div>
    </main>
  )
}
