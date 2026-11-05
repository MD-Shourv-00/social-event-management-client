import { NextRequest, NextResponse } from "next/server"
import { auth } from "./lib/auth"

export async function proxy(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers
        })


        if (!session?.user) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            )
        }

    } catch {
        return NextResponse.redirect(
            new URL("/login", request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/profile/:path*", "/events/create-event", "/events/joined-event", "/events/manage-event"],
}