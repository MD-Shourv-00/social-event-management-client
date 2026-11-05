/* A navigation link — used by the Navbar menu and the Footer quick links. */
export type NavLink = {
  href: string
  label: string
}

/* The kind of social event that can be created. */
export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Food Distribution"
  | "Education"
  | "Blood Donation"
  | "Community Service"

/* Data collected from the Create Event form. */
export type EventFormData = {
  _id: string
  title: string
  description: string
  eventType: EventType
  thumbnail: string
  location: string
  eventDate: string
  email: string
  eventId: string
}
