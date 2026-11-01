export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div
          className="absolute h-24 w-24 animate-ping rounded-full opacity-20"
          style={{ backgroundColor: "#26AE60" }}
        />

        {/* Outer Spinning Ring */}
        <div
          className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-b-transparent"
          style={{
            borderColor: "#26AE60",
            borderTopColor: "transparent",
            borderBottomColor: "#FB8072",
          }}
        />

        {/* Inner Counter-Spinning Ring */}
        <div
          className="absolute h-10 w-10 animate-spin rounded-full border-4 border-r-transparent border-l-transparent [animation-direction:reverse]"
          style={{
            borderColor: "#FB8072",
            borderLeftColor: "transparent",
            borderRightColor: "#26AE60",
          }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 animate-pulse text-sm font-semibold tracking-wider text-gray-600 uppercase">
        Loading, please wait...
      </p>
    </div>
  )
}
