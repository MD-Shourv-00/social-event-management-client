import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import WhatWeDo from "@/components/WhatWeDo"
import Subscribe from "@/components/Subscribe"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      
      <main className="flex-1">
        <Hero />
        <Stats />
        <WhatWeDo />
        <Subscribe />
      </main>

    </div>
  )
}
