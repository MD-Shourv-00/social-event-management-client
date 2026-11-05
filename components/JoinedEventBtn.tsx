"use client"

import { EventFormData } from "@/app/type/type"
import { Button } from "./ui/button"
import { PanelRightClose, Users } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { jwtTokenForClient } from "@/lib/jwt-token-get/jwtTokenForClient"

const JoinedEventBtn = ({ eventData }: { eventData: EventFormData }) => {
  const [joinStatus, setJoinStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const { data: session, isPending } = useSession()
  const router = useRouter()

  const email = session?.user?.email
  const eventId = eventData._id

  // 1. Check joined status from MongoDB
  useEffect(() => {
    if (isPending) return

    const checkJoinedStatus = async () => {
      try {
        const token = await jwtTokenForClient()

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/joined-event/${email}/${eventId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to check status")

        const data = await res.json()
        setJoinStatus(data.joinStatus)
      } catch (error) {
        console.log(error)
        setJoinStatus(false)
      } finally {
        setLoading(false)
      }
    }

    checkJoinedStatus()
  }, [email, eventId, isPending])

  // 2. Join Event
  const handleJoinedBtn = async () => {
    if (!email) {
      router.push("/login")
      return
    }

    try {
      setActionLoading(true)

      const token = await jwtTokenForClient()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/joined-event/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      )

      const response = await res.json()

      if (res.ok && response.success) {
        setJoinStatus(true)
        toast.success("Thanks For Joining 😇")
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Please try again")
    } finally {
      setActionLoading(false)
    }
  }

  // Leave Event
  const handleCancelBtn = async () => {
    if (!email) return

    try {
      setActionLoading(true)

      const token = await jwtTokenForClient()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/joined-event/${email}/${eventId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      const response = await res.json()

      if (res.ok && response.deletedCount > 0) {
        setJoinStatus(false)
        toast.success("You successfully left this event")
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Please try again")
    } finally {
      setActionLoading(false)
    }
  }

  if (isPending || loading) {
    return (
      <Button
        disabled
        className="mt-6 w-full border border-slate-400 py-5 font-semibold"
      >
        Loading...
      </Button>
    )
  }

  return (
    <>
      {joinStatus ? (
        <Button
          disabled={actionLoading}
          className="mt-6 w-full cursor-pointer bg-red-500 py-5 font-semibold text-white hover:bg-red-600"
          onClick={handleCancelBtn}
        >
          <PanelRightClose size={18} />
          Leave Event
        </Button>
      ) : (
        <Button
          disabled={actionLoading}
          onClick={handleJoinedBtn}
          className="mt-6 w-full cursor-pointer bg-[#26AE60] py-5 font-semibold text-white hover:bg-[#209650]"
        >
          <Users size={18} />
          Join Event
        </Button>
      )}
    </>
  )
}

export default JoinedEventBtn
